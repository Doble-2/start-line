import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { PlayerProvider } from "@/src/player";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <PlayerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="singer/[id]" />
          <Stack.Screen name="player" />
        </Stack>
        <StatusBar style="light" />
      </PlayerProvider>
    </ThemeProvider>
  );
}
