import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { FlatList, View } from "react-native";

import { getSingerById, getTracksBySingerId } from "@/src/data";
import { usePlayer } from "@/src/player";
import { theme } from "@/src/theme";
import { AppText, GradientButton, IconButton, Screen } from "@/src/ui/atoms";
import { TrackListItem } from "@/src/ui/molecules/TrackListItem";

export default function SingerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const singerId = String(id ?? "");

  const singer = useMemo(() => getSingerById(singerId), [singerId]);
  const singerTracks = useMemo(() => getTracksBySingerId(singerId), [singerId]);

  const player = usePlayer();

  if (!singer) {
    return (
      <Screen contentStyle={{ paddingTop: theme.spacing.xl }}>
        <AppText variant="headline">Cantante no encontrado</AppText>
        <View style={{ marginTop: theme.spacing.lg }}>
          <GradientButton title="Volver" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen contentStyle={{ paddingTop: theme.spacing.xl }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton icon="chevron-back" onPress={() => router.back()} />
        <AppText variant="caption" color={theme.palette.textTertiary}>
          Perfil
        </AppText>
        <View style={{ width: 46 }} />
      </View>

      <View
        style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.lg }}
      >
        <AppText variant="title" style={{ fontSize: 30 }}>
          {singer.name}
        </AppText>
        <AppText variant="caption" color={theme.palette.textSecondary}>
          {singer.genre}
        </AppText>
        <AppText
          variant="body"
          color={theme.palette.textSecondary}
          style={{ marginTop: theme.spacing.md }}
        >
          {singer.bio}
        </AppText>

        <View style={{ marginTop: theme.spacing.lg }}>
          <GradientButton
            title={singerTracks.length ? "Reproducir" : "Sin canciones"}
            disabled={!singerTracks.length}
            onPress={async () => {
              await player.playQueue(singerTracks, 0);
              router.push("/player");
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: theme.spacing.md }}>
        <AppText variant="headline">Canciones</AppText>
        <AppText variant="caption" color={theme.palette.textSecondary}>
          Recientes (estilo Bento)
        </AppText>
      </View>

      <FlatList
        data={singerTracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: theme.spacing.md,
          paddingBottom: theme.spacing.xxl,
        }}
        renderItem={({ item, index }) => (
          <TrackListItem
            track={item}
            onPlay={async () => {
              await player.playQueue(singerTracks, index);
              router.push("/player");
            }}
          />
        )}
      />
    </Screen>
  );
}
