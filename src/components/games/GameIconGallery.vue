<template>
  <v-container fluid>
    <v-row justify="center">
      <gn-game-icon
        v-for="(game, n) in games"
        :game="game"
        :key="n"
        :width="width"
        class="d-flex child-flex text-center"
      />
    </v-row>
  </v-container>
</template>

<script>
import GameIcon from "./GameIcon";
export default {
  props: ["games", "width"],
  components: {
    "gn-game-icon": GameIcon
  }
};
</script>
