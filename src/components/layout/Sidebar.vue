<template>
  <v-navigation-drawer v-model="drawer" dark app clipped>
    <v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Events</v-list-item-title>
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
