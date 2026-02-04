import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Platform } from "react-native";

import { PlayerProvider } from "@/src/player";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <PlayerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: Platform.select({
              ios: "default",
              android: "slide_from_right",
              default: "fade",
            }),
            animationDuration: 280,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="singer/[id]" />
          <Stack.Screen
            name="player"
            options={{
              presentation: "modal",
              animation: "fade_from_bottom",
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </PlayerProvider>
    </ThemeProvider>
  );
}
