import { View } from "react-native";

import type { Track } from "@/src/data/models";
import { theme } from "@/src/theme";
import { AppText } from "@/src/ui/atoms/AppText";
import { Card } from "@/src/ui/atoms/Card";
import { IconButton } from "@/src/ui/atoms/IconButton";

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
        <IconButton icon="play" onPress={onPlay} />
      </View>
    </Card>
  );
}
