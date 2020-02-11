<template>
  <v-img
    v-bind:src="`/img/games/${game.id}.jpg`"
    v-bind:lazy-src="`/img/games/${game.id}.jpg`"
    class="grey lighten-2"
  >
    <template v-slot:placeholder>
      <v-row class="ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: ["game"]
};
</script>
