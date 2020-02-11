<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <span dark v-on="on">
        {{ time ? readableTime() : readableDateFromNow() }}
      </span>
    </template>
    <span>{{ readableDate() }}</span>
  </v-tooltip>
</template>

<script>
import moment from "moment";
export default {
  props: ["date", "time"],
  methods: {
    readableTime() {
      return moment(Number(this.date)).format("h:mm:ss a");
    },
    readableDateFromNow() {
      return moment(Number(this.date)).fromNow();
    },
    readableDate() {
      return moment(Number(this.date)).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>
