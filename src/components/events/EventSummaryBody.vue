<template>
  <v-container fluid>
    <v-btn
      absolute
      top
      right
      x-large
      color="amber"
      class="white--text add-round-button"
      @click="creatingRound = true"
      v-if="!creatingRound"
    >
      <v-icon class="white--text mr-2">fa-plus</v-icon>
      Add Round
    </v-btn>
    <gn-round-form v-if="creatingRound" :round="{}" :event="event" />
    <gn-round-detail
      v-for="(round, i) in event.rounds"
      v-bind:key="i"
      :round="round"
    />
  </v-container>
</template>

<script>
import RoundDetail from "../rounds/RoundDetail";
import RoundForm from "../rounds/RoundForm";

export default {
  props: ["event"],
  data: () => ({
    creatingRound: false
  }),
  components: {
    "gn-round-detail": RoundDetail,
    "gn-round-form": RoundForm
  }
};
</script>

<style>
td {
  padding: 10px;
}
.container {
  position: relative;
}
.add-round-button {
  z-index: 100;
  top: -20px !important;
  right: 30px !important;
}
</style>
