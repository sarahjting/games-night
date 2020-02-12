<template>
  <v-app id="inspire">
    <gn-sidebar />
    <gn-navbar />
    <gn-content />
    <gn-footer />
  </v-app>
</template>

<script>
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";

export default {
  name: "App",
  props: {
    source: String
  },
  components: {
    "gn-sidebar": Sidebar,
    "gn-navbar": Navbar,
    "gn-footer": Footer,
    "gn-content": Content
  },
  data: () => ({}),
  created() {
    this.$store.dispatch("load");
  }
};
</script>

<style>
#inspire {
  background-color: #4e342e;
}
</style>
