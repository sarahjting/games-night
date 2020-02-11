<template>
  <v-row align="center" class="spacer" no-gutters>
    <v-col cols="12" sm="12" md="12" lg="2">
      <strong v-html="event.name"></strong>
      <div class="grey--text mt-1">
        <gn-readable-date :date="event.createdAt" />
      </div>
    </v-col>

    <v-divider class="hidden-md-and-up" />

    <v-col class="text-no-wrap pa-2" cols="12" md="6" lg="5">
      <gn-game-icon-gallery :games="event.games" :width="100" />
    </v-col>

    <v-col class="text-no-wrap pa-2" cols="12" md="6" lg="5">
      <gn-player-icon-gallery :players="event.players" :width="100" />
    </v-col>
  </v-row>
</template>

<script>
import GameIconGallery from "../games/GameIconGallery";
import PlayerIconGallery from "../players/PlayerIconGallery";
import ReadableDate from "../widgets/ReadableDate";

export default {
  props: ["event"],
  components: {
    "gn-player-icon-gallery": PlayerIconGallery,
    "gn-game-icon-gallery": GameIconGallery,
    "gn-readable-date": ReadableDate
  }
};
</script>
