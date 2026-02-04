import { router } from "expo-router";
import { FlatList, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { singers } from "@/src/data";
import { theme } from "@/src/theme";
import { AppText, Screen } from "@/src/ui/atoms";
import { SingerListItem } from "@/src/ui/molecules/SingerListItem";

export default function SingersScreen() {
  return (
    <Screen contentStyle={{ paddingTop: theme.spacing.xxl }}>
      <View style={{ marginBottom: theme.spacing.lg }}>
        <AppText variant="title" color={theme.palette.pink}>
          Cantantes
        </AppText>
        <AppText variant="caption" color={theme.palette.textSecondary}>
          Elige tu favorito y pon música en un toque.
        </AppText>
      </View>

      <FlatList
        data={singers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingBottom: theme.spacing.xxl,
        }}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInDown.duration(260).springify()}>
            <SingerListItem
              singer={item}
              onPress={() => router.push(`/singer/${item.id}`)}
            />
          </Animated.View>
        )}
      />
    </Screen>
  );
}
