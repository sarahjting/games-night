<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-autocomplete
        label="Add Player"
        outlined
        background-color="white"
        v-model="player.name"
        :items="players"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        label="Score"
        v-model="player.score"
        background-color="white"
        outlined
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["player", "players"]
};
</script>
