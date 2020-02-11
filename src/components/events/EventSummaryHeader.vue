<template>
  <v-row align="center" class="spacer" no-gutters>
    <v-col cols="12" sm="12" md="12" lg="2" class="py-10">
      <strong v-html="event.name" class="white--text"></strong>
      <div class="mt-1 cyan--text">
        <gn-readable-date :date="event.createdAt" />
      </div>
    </v-col>

    <v-col
      cols="12"
      class="hidden-md-and-up pb-0 pt-5"
      v-if="event.games.length"
    >
      <v-divider />
    </v-col>

    <v-col class="text-no-wrap pa-2" cols="12" md="6" lg="5">
      <gn-game-icon-gallery :games="event.games" :width="100" />
    </v-col>

    <v-col cols="12" class="hidden-md-and-up py-0" v-if="event.players.length">
      <v-divider />
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

<style scoped>
strong {
  font-size: 24px;
}
</style>
