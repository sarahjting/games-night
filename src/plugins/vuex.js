import Vue from "vue";
import Vuex from "vuex";
import utils from "../utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    activeEvent: 0,
    events: [],
    games: [],
    players: []
  },
  mutations: {
    setEvents(state, events) {
      state.events = events;
    },
    setGames(state, games) {
      state.games = games;
    },
    setPlayers(state, players) {
      state.players = players;
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
    async loadGames(context) {
      context.commit("setGames", await utils.loadGames());
    },
    async loadPlayers(context) {
      context.commit("setPlayers", await utils.loadPlayers());
    },
    async createEvent(context, args) {
      context.commit("setEvents", await utils.createEvent(args));
    },
    async load(context) {
      await Promise.all([
        context.dispatch("loadEvents"),
        context.dispatch("loadGames"),
        context.dispatch("loadPlayers")
      ]);
    }
  }
});
