<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-combobox
        label="Add Player"
        outlined
        background-color="white"
        v-model="formPlayer.name"
        :items="players"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        label="Score"
        v-model="formPlayer.score"
        background-color="white"
        outlined
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["player", "players"],
  data: () => ({
    formPlayer: { name: "", score: "" }
  }),
  created() {
    this.formPlayer = this.player;
  },
  updated() {
    this.$emit("changed", this.formPlayer, () => {
      this.formPlayer = { name: "", score: "" };
    });
  }
};
</script>
