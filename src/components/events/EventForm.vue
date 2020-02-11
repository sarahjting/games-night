<template>
  <v-expansion-panel :value="true">
    <v-expansion-panel-header color="cyan" class="white--text">
      <strong>
        <v-icon class="mr-2 white--text">fa-plus</v-icon>
        Add Event
      </strong>
    </v-expansion-panel-header>
    <v-expansion-panel-content color="grey lighten-4">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6" lg="8" justify="stretch">
            <v-text-field
              label="Event Name"
              v-model="formEvent.name"
              background-color="white"
              outlined
            />
          </v-col>
          <v-col cols="12" md="6" lg="4" justify="stretch">
            <v-btn x-large color="cyan" dark v-on:click="createEvent()">
              <v-icon class="mr-2">fa-plus</v-icon>
              Create
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["event"],
  data: () => ({
    formEvent: {}
  }),
  methods: {
    createEvent() {
      if (!this.formEvent.name) return;
      const $store = this.$store;
      $store.dispatch("createEvent", this.formEvent);
      this.formEvent = { name: "" };
    }
  },
  created() {
    this.formEvent = this.event;
  }
};
</script>

<style scoped>
button {
  width: 100% !important;
}
</style>
