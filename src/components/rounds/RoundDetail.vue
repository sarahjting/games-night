<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :elevation="hover ? 6 : 3" class="mb-3">
        <v-row>
          <v-col cols="12" md="6" lg="4" justify="center">
            <v-container class="fill-height" fluid>
              <v-row align="center" justify="center">
                <v-col class="px-5 py-0">
                  <div class="mb-2">
                    <gn-game-image
                      :game="round.game"
                      class="round-game-image"
                    />
                  </div>
                  <div>
                    {{ round.game.name }}
                  </div>
                  <div class="grey--text mt-1">
                    <gn-readable-date :date="round.createdAt" :time="true" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" class="hidden-md-and-up py-0">
            <v-divider />
          </v-col>
          <v-col cols="12" md="6" lg="8" class="py-0">
            <v-container class="fill-height" fluid>
              <v-row align="center" justify="center">
                <v-col>
                  <v-simple-table>
                    <tbody>
                      <tr v-for="(player, j) in round.players" v-bind:key="j">
                        <td><gn-player-icon :player="player" width="50" /></td>
                        <td>
                          {{ player.name }}
                          <v-chip
                            color="amber"
                            small
                            dark
                            v-if="j === 0"
                            class="ml-2"
                          >
                            <v-icon>fa-crown</v-icon>
                          </v-chip>
                        </td>
                        <td>{{ player.score }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-col>
              </v-row>
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

export default {
  props: ["round"],
  components: {
    "gn-player-icon": PlayerIcon,
    "gn-game-image": GameImage,
    "gn-readable-date": ReadableDate
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
.v-data-table td {
  padding: 10px 20px;
}
</style>
