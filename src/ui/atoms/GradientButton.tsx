import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import { theme } from "@/src/theme";
import { AppText } from "./AppText";

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  gradient?: readonly [string, string] | readonly [string, string, string];
};

export function GradientButton({
  title,
  onPress,
  style,
  disabled,
  gradient,
}: Props) {
  const colors = gradient ?? theme.gradients.action;
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
          () => undefined,
        );
        onPress();
      }}
      style={({ pressed }: { pressed: boolean }) => [
        {
          borderRadius: theme.radius.xl,
          overflow: "hidden",
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={colors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppText variant="caption" style={{ letterSpacing: 0.4 }}>
          {title}
        </AppText>
      </LinearGradient>
    </Pressable>
  );
}
