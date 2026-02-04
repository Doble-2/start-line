import { View } from "react-native";

import { theme } from "@/src/theme";

export function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.palette.border,
        width: "100%",
      }}
    />
  );
}
