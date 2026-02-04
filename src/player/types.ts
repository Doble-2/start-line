import type { Track } from "@/src/data/models";

export type PlayerSnapshot = {
  queue: Track[];
  currentIndex: number;
  isLoaded: boolean;
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  error?: string;
};

export type PlayerApi = {
  snapshot: PlayerSnapshot;
  currentTrack: Track | null;
  playQueue: (queue: Track[], startIndex: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  seekTo: (ms: number) => Promise<void>;
  skipBy: (deltaMs: number) => Promise<void>;
};
