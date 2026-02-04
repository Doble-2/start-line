import React from "react";
import { SafeAreaView, StyleProp, View, ViewStyle } from "react-native";

import { theme } from "@/src/theme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, style, contentStyle }: Props) {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: theme.palette.black }, style]}
    >
      <View
        style={[{ flex: 1, paddingHorizontal: theme.spacing.lg }, contentStyle]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
