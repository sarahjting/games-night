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

describe("Player", () => {
  before(async () => {
    players = await db("players");
  });
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
});

describe("Event", () => {
  before(async () => {
    events = await db("events");
  });
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
  it("should return rounds of the event", async () => {
    const res = await query(
      "query($where:EventWhereInput){events(where:$where){name rounds{ game{name} players{score player{name}}}}}",
      { where: { id: events[0].id } }
    );
    expect(res.events[0].rounds).to.be.an("array");
    expect(res.events[0].rounds[0]).to.be.an("object");
    expect(res.events[0].rounds[0].game).to.be.an("object");
    expect(res.events[0].rounds[0].players).to.be.an("array");
  });
  it("should return players of the event", async () => {
    const res = await query("query{events{name players{ name }}}");
    expect(res.events[0].players).to.be.an("array");
  });
});

describe("Games", () => {
  before(async () => {
    games = await db("games");
  });
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
});
