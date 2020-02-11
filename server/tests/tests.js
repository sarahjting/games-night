const axios = require("axios");
const { expect } = require("chai");

// db set up
const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config);

const url = `http://localhost:${process.env.PORT}/api`;
let players, events, games;

async function query(query, variables = {}) {
  return (await axios.post(url, { query, variables })).data.data;
}

describe("GraphQL", () => {
  before(async () => {
    games = await db("games");
    players = await db("players");
    events = await db("events");
  });
  describe("Player", () => {
    it("should return all players", async () => {
      const res = await query("query{players{name}}");
      expect(res.players.length).to.equal(players.length);
    });
    it("should return a player by name", async () => {
      const res = await query(
        "query($where:PlayerWhereInput){players(where:$where){name}}",
        { where: { name: players[0].name } }
      );
      expect(res.players.length).to.equal(1);
    });
    it("should return rounds that the player is in", async () => {
      const res = await query(
        "query($where:PlayerWhereInput){players(where:$where){name rounds{ round{game{name} players{score player{name}}} score }}}",
        { where: { name: players[0].name } }
      );
      expect(res.players[0].rounds).to.be.an("array");
      expect(res.players[0].rounds[0].round).to.be.an("object");
      expect(res.players[0].rounds[0].round.game).to.be.an("object");
      expect(res.players[0].rounds[0].round.game.name).to.be.a("string");
    });
    it("should create a player", async () => {
      const res1 = await query(
        "mutation($input:PlayerCreateInput!){createPlayer(input:$input){name}}",
        { input: { name: "New Player" } }
      );
      const res2 = await query(
        "query($where:PlayerWhereInput){players(where:$where){name}}",
        { where: { name: "New Player" } }
      );
      expect(res2.players.length).to.equal(1);
    });
  });

  describe("Event", () => {
    it("should return all events", async () => {
      const res = await query("query{events{name}}");
      expect(res.events.length).to.equal(events.length);
    });
    it("should return an event by id", async () => {
      const res = await query(
        "query($where:EventWhereInput){events(where:$where){name}}",
        { where: { id: events[0].id } }
      );
      expect(res.events.length).to.equal(1);
    });
    it("should return players of the event", async () => {
      const res = await query("query{events{name players{ name }}}");
      expect(res.events[0].players).to.be.an("array");
    });
    it("should create an event", async () => {
      const res1 = await query(
        "mutation($input:EventCreateInput!){createEvent(input:$input){name}}",
        {
          input: { name: "New Event" }
        }
      );
      const res2 = await query("query{events{name}}");
      expect(res2.events[0].name).to.equal("New Event");
    });
  });

  describe("Round", () => {
    it("should return rounds of an event", async () => {
      const res = await query(
        "query($where:EventWhereInput){events(where:$where){name rounds{ event{name} game{name} players{score player{name}}}}}",
        { where: { id: events[0].id } }
      );
      expect(res.events[0].rounds).to.be.an("array");
      expect(res.events[0].rounds[0]).to.be.an("object");
      expect(res.events[0].rounds[0].event).to.be.an("object");
      expect(res.events[0].rounds[0].game).to.be.an("object");
      expect(res.events[0].rounds[0].players).to.be.an("array");
    });
    it("should add a round to an event", async () => {
      const res0 = await query(
        "query($where:EventWhereInput){events(where:$where){name rounds{ game{name} players{score player{name}}}}}",
        { where: { id: 1 } }
      );
      const res1 = await query(
        "mutation($input:RoundCreateInput!){createRound(input:$input){event{name} game{name} players{player{name}}}}",
        {
          input: {
            eventId: 1,
            players: players.map(x => x.name),
            playerScores: players.map((x, i) => i),
            game: games[0].name
          }
        }
      );
      const res2 = await query(
        "query($where:EventWhereInput){events(where:$where){name rounds{ game{name} players{score player{name}}}}}",
        { where: { id: 1 } }
      );
      expect(res2.events[0].rounds.length).to.equal(
        res0.events[0].rounds.length + 1
      );
      const i = res2.events.length - 1;
      expect(res2.events[0].rounds[i]).to.be.an("object");
      expect(res2.events[0].rounds[i].game).to.be.an("object");
      expect(res2.events[0].rounds[i].players).to.be.an("array");
    });
  });

  describe("Games", () => {
    it("should return all games", async () => {
      const res = await query("query{games{name}}");
      expect(res.games.length).to.equal(games.length);
    });
    it("should return a game by id", async () => {
      const res = await query(
        "query($where:GameWhereInput){games(where:$where){name}}",
        { where: { name: games[0].name } }
      );
      expect(res.games.length).to.equal(1);
    });
    it("should return rounds of a game", async () => {
      const res = await query(
        "query($where:GameWhereInput){games(where:$where){name rounds{players{score player{name}}}}}",
        { where: { name: games[0].name } }
      );
      expect(res.games[0].rounds).to.be.an("array");
    });
    it("should create a game", async () => {
      const res1 = await query(
        "mutation($input:GameCreateInput!){createGame(input:$input){name}}",
        { input: { name: "New Game" } }
      );
      const res2 = await query(
        "query($where:GameWhereInput){games(where:$where){name}}",
        { where: { name: "New Game" } }
      );
      expect(res2.games.length).to.equal(1);
    });
  });
});
