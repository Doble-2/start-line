import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

import { formatTime, usePlayer } from "@/src/player";
import { theme } from "@/src/theme";
import { AppText, GradientButton, IconButton, Screen } from "@/src/ui/atoms";

export default function PlayerScreen() {
  const player = usePlayer();
  const { snapshot, currentTrack } = player;

  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  const duration = snapshot.durationMs || 1;
  const progress = snapshot.positionMs;

  const sliderValue = isSeeking ? seekValue : progress;

  const timeLeft = useMemo(() => {
    const remaining = Math.max(
      0,
      (snapshot.durationMs ?? 0) - (isSeeking ? seekValue : progress),
    );
    return formatTime(remaining);
  }, [isSeeking, progress, seekValue, snapshot.durationMs]);

  if (!currentTrack) {
    return (
      <Screen
        contentStyle={{
          paddingTop: theme.spacing.xl,
          justifyContent: "center",
        }}
      >
        <AppText variant="headline" style={{ textAlign: "center" }}>
          Nada reproduciéndose
        </AppText>
        <AppText
          variant="caption"
          color={theme.palette.textSecondary}
          style={{ textAlign: "center", marginTop: theme.spacing.sm }}
        >
          Elige una canción para empezar.
        </AppText>
        <View style={{ marginTop: theme.spacing.xl }}>
          <GradientButton title="Volver" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen contentStyle={{ paddingTop: theme.spacing.xl }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton icon="chevron-back" onPress={() => router.back()} />
        <AppText variant="caption" color={theme.palette.textTertiary}>
          Reproductor
        </AppText>
        <View style={{ width: 46 }} />
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <View
          style={{
            borderRadius: theme.radius.xl,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: theme.palette.border,
          }}
        >
          <LinearGradient
            colors={theme.gradients.actionAlt as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: theme.spacing.xxl }}
          >
            <AppText variant="caption" color={theme.palette.textSecondary}>
              Now Playing
            </AppText>
            <AppText variant="headline" style={{ marginTop: theme.spacing.sm }}>
              {currentTrack.title}
            </AppText>
            <AppText variant="caption" color={theme.palette.textSecondary}>
              {currentTrack.album}
            </AppText>
          </LinearGradient>
        </View>

        <View style={{ marginTop: theme.spacing.xl }}>
          <Slider
            minimumValue={0}
            maximumValue={duration}
            value={sliderValue}
            onSlidingStart={() => {
              setIsSeeking(true);
              setSeekValue(progress);
            }}
            onValueChange={(v) => setSeekValue(v)}
            onSlidingComplete={async (v) => {
              setIsSeeking(false);
              await player.seekTo(v);
            }}
            minimumTrackTintColor={theme.palette.purple2}
            maximumTrackTintColor={"rgba(255,255,255,0.18)"}
            thumbTintColor={theme.palette.white}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: theme.spacing.xs,
            }}
          >
            <AppText variant="caption" color={theme.palette.textTertiary}>
              {formatTime(isSeeking ? seekValue : progress)}
            </AppText>
            <AppText variant="caption" color={theme.palette.textTertiary}>
              -{timeLeft}
            </AppText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: theme.spacing.xl,
          }}
        >
          <IconButton
            icon="play-skip-back"
            onPress={() => void player.prev()}
          />

          <View
            style={{
              borderRadius: theme.radius.pill,
              overflow: "hidden",
              width: 74,
              height: 74,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <LinearGradient
              colors={theme.gradients.action as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={snapshot.isPlaying ? "pause" : "play"}
                size={30}
                color={theme.palette.white}
                onPress={() => void player.togglePlay()}
              />
            </LinearGradient>
          </View>

          <IconButton
            icon="play-skip-forward"
            onPress={() => void player.next()}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing.lg,
          }}
        >
          <GradientButton
            title="-15s"
            onPress={() => void player.skipBy(-15000)}
            style={{ flex: 1, marginRight: theme.spacing.md }}
            gradient={theme.gradients.actionAlt}
          />
          <GradientButton
            title="+15s"
            onPress={() => void player.skipBy(15000)}
            style={{ flex: 1, marginLeft: theme.spacing.md }}
          />
        </View>

        {snapshot.error ? (
          <AppText
            variant="caption"
            color={theme.palette.danger}
            style={{ marginTop: theme.spacing.lg }}
          >
            {snapshot.error}
          </AppText>
        ) : null}
      </View>
    </Screen>
  );
}
