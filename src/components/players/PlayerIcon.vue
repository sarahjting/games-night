<template>
  <v-avatar :width="width" :height="height ? height : width">
    <v-img
      v-bind:src="`/img/players/${player.id}.jpg`"
      v-bind:lazy-src="`/img/players/${player.id}.jpg`"
      aspect-ratio="1"
      class="grey lighten-2"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-avatar>
</template>

<script>
export default {
  props: ["player", "width", "height"]
};
</script>
