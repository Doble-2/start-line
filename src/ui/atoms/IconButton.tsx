import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleProp, ViewStyle } from "react-native";

import { theme } from "@/src/theme";

type Props = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function IconButton({
  icon,
  onPress,
  size = 22,
  style,
  disabled,
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        {
          width: 46,
          height: 46,
          borderRadius: theme.radius.pill,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.surface2,
          borderWidth: 1,
          borderColor: theme.palette.border,
          opacity: disabled ? 0.5 : pressed ? 0.95 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
        Platform.OS === "web" ? ({ cursor: "pointer" } as any) : null,
        style,
      ]}
    >
      <Ionicons name={icon} size={size} color={theme.palette.textPrimary} />
    </Pressable>
  );
}
