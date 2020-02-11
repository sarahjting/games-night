<template>
  <v-app-bar app dark clipped-left color="pink darken-1">
    <v-app-bar-nav-icon v-on:click.stop="toggleDrawer()" />
    <v-toolbar-title>
      <v-icon class="mr-2">fa-dice fa-flip-horizontal</v-icon>
      Games Night
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  }
};
</script>
