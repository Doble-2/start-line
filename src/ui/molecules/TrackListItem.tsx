import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import type { Track } from "@/src/data/models";
import { theme } from "@/src/theme";
import { AppText } from "@/src/ui/atoms/AppText";
import { Card } from "@/src/ui/atoms/Card";

type Props = {
  track: Track;
  onPlay: () => void;
};

export function TrackListItem({ track, onPlay }: Props) {
  return (
    <Card
      style={{
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppText variant="headline" style={{ fontSize: 16 }}>
            {track.title}
          </AppText>
          <AppText variant="caption" color={theme.palette.textSecondary}>
            {track.album}
          </AppText>
        </View>
        <Pressable
          onPress={onPlay}
          style={({ pressed }) => [
            {
              width: 50,
              height: 50,
              borderRadius: theme.radius.pill,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.16)",
              opacity: pressed ? 0.96 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <LinearGradient
            colors={theme.gradients.actionAlt as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="play" size={22} color={theme.palette.white} />
          </LinearGradient>
        </Pressable>
      </View>
    </Card>
  );
}
