import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

import { theme } from "@/src/theme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, style, contentStyle }: Props) {
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const deviceWidth = Math.min(430, Math.max(320, width - 32));
  const deviceHeight = isWeb
    ? Math.max(720, Math.min(920, height - 32))
    : undefined;

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: isWeb ? theme.palette.surface0 : theme.palette.black,
        },
      ]}
    >
      {isWeb ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing.lg,
          }}
        >
          <View
            style={{
              width: deviceWidth,
              height: deviceHeight,
              borderRadius: 34,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.14)",
              backgroundColor: theme.palette.black,
              shadowColor: "#000",
              shadowOpacity: 0.45,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 12 },
              elevation: 20,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 10,
                alignSelf: "center",
                width: 124,
                height: 24,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.06)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                zIndex: 10,
              }}
            />
            <SafeAreaView
              style={[{ flex: 1, backgroundColor: theme.palette.black }, style]}
            >
              <View
                style={[
                  { flex: 1, paddingHorizontal: theme.spacing.lg },
                  contentStyle,
                ]}
              >
                {children}
              </View>
            </SafeAreaView>
          </View>
        </View>
      ) : (
        <SafeAreaView
          style={[{ flex: 1, backgroundColor: theme.palette.black }, style]}
        >
          <View
            style={[
              { flex: 1, paddingHorizontal: theme.spacing.lg },
              contentStyle,
            ]}
          >
            {children}
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
