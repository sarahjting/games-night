import axios from "axios";

async function query(query, variables) {
  return (
    await axios.post("/api", {
      query,
      variables
    })
  ).data.data;
}

export default {
  async loadEvents(where = {}) {
    return (
      await query(
        `query($where:EventWhereInput){
          events(where:$where){
            id name createdAt 
            games {id name} 
            players {id name score}
            rounds {id createdAt game{id name} players{id name score}}
          }
        }`,
        where
      )
    ).events;
  },
  async loadGames(where = {}) {
    return (
      await query(
        `query($where:GameWhereInput){games(where:$where){id name}}`,
        where
      )
    ).games;
  },
  async loadPlayers(where = {}) {
    return (
      await query(
        `query($where:PlayerWhereInput){players(where:$where){id name}}`,
        where
      )
    ).players;
  },
  async createEvent(input = {}) {
    const result = await query(
      `mutation($input:EventCreateInput!){
        createEvent(input:$input) { name }
      }`,
      { input }
    );
    return result.event;
  }
};
