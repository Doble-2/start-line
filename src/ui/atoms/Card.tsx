import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

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
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }: { pressed: boolean }) => [
          baseStyle,
          { opacity: pressed ? 0.92 : 1 },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[baseStyle, style]}>{children}</View>;
}
