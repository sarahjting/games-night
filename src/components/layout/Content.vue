<template>
  <v-content>
    <v-container fluid class="py-md-5 px-md-10 brown darken-3">
      <v-row justify="center">
        <v-expansion-panels popout>
          <gn-event-form :event="{}" />
          <gn-event-summary
            v-for="(event, i) in $store.state.events"
            :key="i"
            :event="event"
          />
        </v-expansion-panels>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import EventSummary from "../events/EventSummary";
import EventForm from "../events/EventForm";
export default {
  name: "Content",
  components: {
    "gn-event-summary": EventSummary,
    "gn-event-form": EventForm
  }
};
</script>

<style scoped>
.create-event-button {
  z-index: 100 !important;
  right: 30px !important;
  top: 10px !important;
}
</style>
