<template>
  <v-col cols="12" :md="shrink ? 5 : 6" :lg="shrink ? 6 : 8" class="py-0">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-simple-table>
            <tbody>
              <tr v-for="(player, j) in round.players" v-bind:key="j">
                <td><gn-player-icon :player="player" width="50" /></td>
                <td>
                  {{ player.name }}
                  <v-chip color="amber" small dark v-if="j === 0" class="ml-2">
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
</template>
<script>
import PlayerIcon from "../players/PlayerIcon";
export default {
  props: ["round", "shrink"],
  components: {
    "gn-player-icon": PlayerIcon
  }
};
</script>
<style scoped>
.v-chip .v-icon {
  font-size: 0.8rem;
}
.v-data-table td {
  padding: 10px 20px;
}
</style>
