import React from "react";
import { Platform, Pressable, StyleProp, View, ViewStyle } from "react-native";

import { theme } from "@/src/theme";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, onPress, style }: Props) {
  const baseStyle: ViewStyle = {
    backgroundColor: theme.palette.surface1,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.palette.border,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }: { pressed: boolean }) => [
          baseStyle,
          {
            opacity: pressed ? 0.96 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
          },
          Platform.OS === "web" ? ({ cursor: "pointer" } as any) : null,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[baseStyle, style]}>{children}</View>;
}
