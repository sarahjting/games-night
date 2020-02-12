<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :elevation="hover ? 6 : 3" class="mb-3">
        <v-row>
          <gn-round-detail-game
            :shrink="!!cardRound.rounds"
            :round="cardRound"
            @clicked="loadGameHistory()"
          />
          <v-col
            cols="12"
            class="hidden-md-and-up py-0"
            v-if="cardRound.rounds"
          >
            <v-divider />
          </v-col>
          <v-col
            cols="12"
            md="4"
            lg="3"
            justify="center"
            v-if="cardRound.rounds"
          >
            <gn-game-history
              v-if="typeof cardRound.rounds === 'object'"
              :game="cardRound.game"
              :rounds="cardRound.rounds"
            />
            <v-icon
              class="fa-pulse"
              v-if="typeof cardRound.rounds === 'boolean'"
              >fa-spinner</v-icon
            >
          </v-col>
          <v-col cols="12" class="hidden-md-and-up py-0">
            <v-divider />
          </v-col>
          <gn-round-detail-players
            :shrink="!!cardRound.rounds"
            :round="cardRound"
          />
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
import GameHistory from "../games/GameHistory";
import RoundDetailGame from "./RoundDetailGame";
import RoundDetailPlayers from "./RoundDetailPlayers";
import utils from "../../utils";

export default {
  props: ["round"],
  data: () => ({
    cardRound: {}
  }),
  components: {
    "gn-round-detail-game": RoundDetailGame,
    "gn-round-detail-players": RoundDetailPlayers,
    "gn-game-history": GameHistory
  },
  methods: {
    async loadGameHistory() {
      if (this.cardRound.rounds) return;
      this.cardRound.rounds = true;

      const gameDetails = await utils.loadGameDetails(this.cardRound.game.id);
      this.cardRound.rounds = gameDetails.rounds;
      console.log(JSON.parse(JSON.stringify(this.cardRound)));
    }
  },
  created() {
    this.cardRound = this.round;
  }
};
</script>
