import { Audio } from "expo-av";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Track } from "@/src/data/models";
import type { PlayerApi, PlayerSnapshot } from "./types";

const PlayerContext = createContext<PlayerApi | null>(null);

const initialSnapshot: PlayerSnapshot = {
  queue: [],
  currentIndex: -1,
  isLoaded: false,
  isPlaying: false,
  positionMs: 0,
  durationMs: 0,
};

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const queueRef = useRef<Track[]>([]);
  const indexRef = useRef<number>(-1);
  const nextRef = useRef<() => void>(() => undefined);

  const [snapshot, setSnapshot] = useState<PlayerSnapshot>(initialSnapshot);

  useEffect(() => {
    queueRef.current = snapshot.queue;
    indexRef.current = snapshot.currentIndex;
  }, [snapshot.queue, snapshot.currentIndex]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(() => undefined);

    return () => {
      const s = soundRef.current;
      soundRef.current = null;
      if (s) s.unloadAsync().catch(() => undefined);
    };
  }, []);

  const loadTrack = useCallback(async (track: Track, shouldPlay: boolean) => {
    try {
      setSnapshot((prev) => ({ ...prev, isLoaded: false, error: undefined }));

      if (soundRef.current) {
        soundRef.current.setOnPlaybackStatusUpdate(null);
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const onStatus = (status: any) => {
        if (!status?.isLoaded) {
          if (status?.error) {
            setSnapshot((prev) => ({
              ...prev,
              error: String(status.error),
              isLoaded: false,
            }));
          }
          return;
        }

        setSnapshot((prev) => ({
          ...prev,
          isLoaded: true,
          isPlaying: Boolean(status.isPlaying),
          positionMs: Number(status.positionMillis ?? 0),
          durationMs: Number(status.durationMillis ?? 0),
        }));

        if (status.didJustFinish) {
          // Auto-next
          nextRef.current?.();
        }
      };

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.audioUri },
        { shouldPlay },
        onStatus,
      );

      soundRef.current = sound;
    } catch (e: any) {
      setSnapshot((prev) => ({
        ...prev,
        error: e?.message ?? String(e),
        isLoaded: false,
      }));
    }
  }, []);

  const nextInternal = useCallback(async () => {
    const queue = queueRef.current;
    if (!queue.length) return;
    const nextIndex = Math.min(indexRef.current + 1, queue.length - 1);
    if (nextIndex === indexRef.current) return;

    setSnapshot((prev) => ({ ...prev, currentIndex: nextIndex }));
    await loadTrack(queue[nextIndex], true);
  }, [loadTrack]);

  useEffect(() => {
    nextRef.current = () => {
      void nextInternal();
    };
  }, [nextInternal]);

  const prevInternal = useCallback(async () => {
    const queue = queueRef.current;
    if (!queue.length) return;

    // If already progressed, restart track; else go previous.
    if (snapshot.positionMs > 2500) {
      await soundRef.current?.setPositionAsync(0);
      return;
    }

    const prevIndex = Math.max(indexRef.current - 1, 0);
    if (prevIndex === indexRef.current) return;

    setSnapshot((prev) => ({ ...prev, currentIndex: prevIndex }));
    await loadTrack(queue[prevIndex], true);
  }, [loadTrack, snapshot.positionMs]);

  const playQueue = useCallback(
    async (queue: Track[], startIndex: number) => {
      const safeIndex = Math.max(0, Math.min(startIndex, queue.length - 1));
      setSnapshot((prev) => ({
        ...prev,
        queue,
        currentIndex: queue.length ? safeIndex : -1,
        positionMs: 0,
        durationMs: 0,
        error: undefined,
      }));

      if (!queue.length) return;
      await loadTrack(queue[safeIndex], true);
    },
    [loadTrack],
  );

  const togglePlay = useCallback(async () => {
    const s = soundRef.current;
    if (!s) return;

    const status = await s.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await s.pauseAsync();
    } else {
      await s.playAsync();
    }
  }, []);

  const seekTo = useCallback(async (ms: number) => {
    const s = soundRef.current;
    if (!s) return;

    const status = await s.getStatusAsync();
    if (!status.isLoaded) return;

    const duration = Number(status.durationMillis ?? 0);
    const clamped = Math.max(0, Math.min(ms, duration || ms));
    await s.setPositionAsync(clamped);
  }, []);

  const skipBy = useCallback(
    async (deltaMs: number) => {
      await seekTo(snapshot.positionMs + deltaMs);
    },
    [seekTo, snapshot.positionMs],
  );

  const api: PlayerApi = useMemo(() => {
    const currentTrack =
      snapshot.currentIndex >= 0 &&
      snapshot.currentIndex < snapshot.queue.length
        ? snapshot.queue[snapshot.currentIndex]
        : null;

    return {
      snapshot,
      currentTrack,
      playQueue,
      togglePlay,
      next: nextInternal,
      prev: prevInternal,
      seekTo,
      skipBy,
    };
  }, [
    nextInternal,
    playQueue,
    prevInternal,
    seekTo,
    skipBy,
    snapshot,
    togglePlay,
  ]);

  return (
    <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
