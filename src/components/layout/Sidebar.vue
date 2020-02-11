<template>
  <v-navigation-drawer
    v-model="drawer"
    class="brown darken-4 orange--text"
    app
    clipped
  >
    <v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon class="pink--text text--darken-1">
            mdi-view-dashboard
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="white--text">Events</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    drawer: {
      set(value) {
        this.$store.commit("setDrawer", value);
      },
      get() {
        return this.$store.state.drawer;
      }
    }
  }
};
</script>
