<template>
  <v-expansion-panel hide-actions>
    <v-expansion-panel-header color="cyan darken-3" dark>
      <gn-event-summary-header :event="event" />
    </v-expansion-panel-header>

    <v-expansion-panel-content color="grey lighten-4">
      <gn-event-summary-body :event="event" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import EventSummaryHeader from "./EventSummaryHeader";
import EventSummaryBody from "./EventSummaryBody";

export default {
  props: ["event"],
  components: {
    "gn-event-summary-body": EventSummaryBody,
    "gn-event-summary-header": EventSummaryHeader
  }
};
</script>
