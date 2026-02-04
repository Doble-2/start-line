import { LinearGradient } from "expo-linear-gradient";
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
          width: 56,
          height: 56,
          borderRadius: theme.radius.xl,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.14)",
        }}
      >
        <LinearGradient
          colors={theme.gradients.action as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AppText variant="headline" style={{ fontSize: 18 }}>
            {singer.name.slice(0, 1).toUpperCase()}
          </AppText>
        </LinearGradient>
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
