import Vue from "vue";
import Vuex from "vuex";
import utils from "../utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    activeEvent: 0,
    events: [],
    games: []
  },
  mutations: {
    setEvents(state, events) {
      state.events = events;
    },
    setDrawer(state, value) {
      state.drawer = value;
    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    }
  },
  actions: {
    async loadEvents(context) {
      context.commit("setEvents", await utils.loadEvents());
    },
    async createEvent(context, args) {
      context.commit("setEvents", await utils.createEvent(args));
    }
  }
});
