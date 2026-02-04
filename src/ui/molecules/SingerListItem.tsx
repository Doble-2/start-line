import { View } from "react-native";

import type { Singer } from "@/src/data/models";
import { theme } from "@/src/theme";
import { AppText } from "@/src/ui/atoms/AppText";
import { Card } from "@/src/ui/atoms/Card";

type Props = {
  singer: Singer;
  onPress: () => void;
};

export function SingerListItem({ singer, onPress }: Props) {
  return (
    <Card
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.lg,
      }}
    >
      <View
        style={{
          width: 54,
          height: 54,
          borderRadius: theme.radius.lg,
          backgroundColor: theme.palette.surface2,
          borderWidth: 1,
          borderColor: theme.palette.border,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppText variant="headline" style={{ fontSize: 18 }}>
          {singer.name.slice(0, 1).toUpperCase()}
        </AppText>
      </View>
      <View style={{ flex: 1 }}>
        <AppText variant="headline" style={{ fontSize: 18 }}>
          {singer.name}
        </AppText>
        <AppText variant="caption" color={theme.palette.textSecondary}>
          {singer.genre}
        </AppText>
      </View>
    </Card>
  );
}
