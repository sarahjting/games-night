import axios from "axios";

async function query(query, variables) {
  return (
    await axios.post("/api", {
      query,
      variables
    })
  ).data.data;
}

const eventSelector = `
  id name createdAt 
  games {id name} 
  players {id name score}
  rounds {id createdAt game{id name} players{id name score}}
`;

export default {
  async loadEvents(where = {}) {
    return (
      await query(
        `query($where:EventWhereInput){events(where:$where){${eventSelector}}}`,
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
      `mutation($input:EventCreateInput!){createEvent(input:$input) { ${eventSelector} }}`,
      { input }
    );
    return result.createEvent;
  },
  async createRound(input = {}) {
    const result = await query(
      `mutation($input:RoundCreateInput!){
        createRound(input:$input) { 
          id createdAt game{id name} players{id name score}
        }
      }`,
      { input }
    );
    return result.createRound;
  }
};
