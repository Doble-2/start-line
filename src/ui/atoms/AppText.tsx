import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

import { theme } from "@/src/theme";

type Variant = "title" | "headline" | "body" | "caption";

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function AppText({ variant = "body", color, style, ...rest }: Props) {
  const base = theme.typography[variant];
  return (
    <Text
      {...rest}
      style={[
        { color: color ?? theme.palette.textPrimary },
        base as TextStyle,
        style,
      ]}
    />
  );
}
