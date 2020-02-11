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
            name createdAt 
            games {id name} 
            players {id name score}
            rounds {id createdAt game{id name} players{id name score}}
          }
        }`,
        where
      )
    ).events;
  },
  async createEvent(input = {}) {
    const result = await query(
      `mutation($input:EventCreateInput!){
        createEvent(input:$input) { name }
      }`,
      { input }
    );
    return result.event;
  },
  loadGames(where = {}) {},
  loadPlayers(where = {}) {}
};
