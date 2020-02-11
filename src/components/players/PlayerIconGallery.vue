<template>
  <v-container fluid>
    <v-row justify="center">
      <v-badge
        v-for="(player, n) in players"
        :key="n"
        color="cyan"
        :content="player.name"
        bottom
        class="mr-1 mb-5"
        overlap
      >
        <v-badge
          :value="n === 0"
          color="amber"
          icon="fa-crown"
          overlap
          offset-x="30"
          offset-y="30"
        >
          <gn-player-icon :player="player" class="mr-1" :width="width" />
        </v-badge>
      </v-badge>
    </v-row>
  </v-container>
</template>

<script>
import PlayerIcon from "./PlayerIcon";
export default {
  props: ["players", "width"],
  components: {
    "gn-player-icon": PlayerIcon
  }
};
</script>

<style>
.v-badge__badge.cyan {
  left: auto !important;
  right: auto !important;
  width: 100% !important;
}
</style>
