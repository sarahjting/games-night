<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :elevation="hover ? 6 : 3" class="mb-3">
        <v-row>
          <v-col cols="12" md="6" lg="4" justify="center">
            <v-container class="fill-height" fluid>
              <v-autocomplete outlined label="Game" :items="games" />
            </v-container>
          </v-col>
          <v-col cols="12" class="hidden-md-and-up py-0">
            <v-divider />
          </v-col>
          <v-col cols="12" md="6" lg="6" class="py-0">
            <v-container class="fill-height" fluid>
              <gn-round-form-player
                :players="players"
                :player="{ name: '', score: '' }"
              />
              <gn-round-form-player
                v-for="(player, j) in formRound.players"
                :key="j"
                :players="players"
              />
            </v-container>
          </v-col>
          <v-col cols="12" class="hidden-md-and-up py-0">
            <v-divider />
          </v-col>
          <v-col cols="12" md="12" lg="2" justify="stretch">
            <v-container class="fill-height" fluid>
              <v-btn
                x-large
                color="cyan"
                dark
                v-on:click="createRound()"
                class="mb-7"
              >
                <v-icon class="mr-2">fa-plus</v-icon>
                Create
              </v-btn>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
import GameImage from "../games/GameImage";
import PlayerIcon from "../players/PlayerIcon";
import ReadableDate from "../widgets/ReadableDate";
import RoundFormPlayer from "./RoundFormPlayer";

export default {
  props: ["round"],
  data: () => ({
    formRound: {},
    formPlayer: {},
    players: [],
    games: []
  }),
  components: {
    "gn-player-icon": PlayerIcon,
    "gn-game-image": GameImage,
    "gn-readable-date": ReadableDate,
    "gn-round-form-player": RoundFormPlayer
  },
  methods: {
    createEvent() {
      const $store = this.$store;
      $store.dispatch("createEvent", this.formEvent).then(function() {
        $store.dispatch("loadEvents");
      });
      this.formEvent = { name: "" };
    }
  },
  created() {
    this.formRound = this.formRound;
    this.players = this.$store.state.players.map(x => x.name);
    this.games = this.$store.state.games.map(x => x.name);
  }
};
</script>

<style scoped>
.v-chip .v-icon {
  font-size: 0.8rem;
}
.round-game-image {
  max-height: 200px;
}
.v-data-table {
  width: 100%;
}
.v-data-table td {
  padding: 10px 20px;
}
button {
  width: 100%;
}
</style>
