<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-avatar tile :width="width" :height="height ? height : width" v-on="on">
        <gn-game-image :game="game" />
      </v-avatar>
    </template>
    <span>{{ game.name }}</span>
  </v-tooltip>
</template>

<script>
import GameImage from "./GameImage";
export default {
  props: ["game", "width", "height"],
  components: {
    "gn-game-image": GameImage
  }
};
</script>
