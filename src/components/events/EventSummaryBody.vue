<template>
  <v-container fluid>
    <gn-round-detail
      v-for="(round, i) in event.rounds"
      v-bind:key="i"
      :round="round"
    />
  </v-container>
</template>

<script>
import RoundDetail from "../rounds/RoundDetail";

export default {
  props: ["event"],
  components: {
    "gn-round-detail": RoundDetail
  }
};
</script>

<style>
td {
  padding: 10px;
}
</style>
