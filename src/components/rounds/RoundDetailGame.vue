<template>
  <v-col cols="12" :md="shrink ? 3 : 6" :lg="shrink ? 3 : 4" justify="center">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="px-5 py-0" @click="$emit('clicked')">
          <div class="mb-2">
            <gn-game-image :game="round.game" class="round-game-image" />
          </div>
          <div>
            {{ round.game.name }}
          </div>
          <div class="grey--text mt-1">
            <gn-readable-date :date="round.createdAt" :time="true" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>
<script>
import GameImage from "../games/GameImage";
import ReadableDate from "../widgets/ReadableDate";
export default {
  props: ["round", "shrink"],
  components: {
    "gn-game-image": GameImage,
    "gn-readable-date": ReadableDate
  }
};
</script>

<style scoped>
.round-game-image {
  max-height: 200px;
}
.container {
  cursor: pointer;
}
</style>
