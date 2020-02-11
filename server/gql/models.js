const axios = require("axios");
const fs = require("fs");

buildModel = (db, tableName) => ({
  get: async function(where = {}, orderBy = {}, joins = []) {
    const query = db(tableName);
    for (const i of Object.keys(where)) {
      query.where(camelToSnake(i), where[i]);
    }
    for (const i of Object.keys(orderBy)) {
      query.orderBy(camelToSnake(i), orderBy[i]);
    }
    for (const i of joins) {
      query.join(i[0], i[1], "=", i[2]);
    }

    const raw = await query;
    const r1 = [];
    for (const i of raw) {
      const r2 = {};
      for (const j in i) r2[snakeToCamel(j)] = i[j];
      r1.push(r2);
    }
    return r1;
  },
  first: async function(where, orderBy) {
    return (await this.get(where, orderBy)).pop();
  },
  create: async function(input) {
    const insert = {};
    for (const i of Object.keys(input)) insert[camelToSnake(i)] = input[i];
    return (
      await db(tableName)
        .insert(insert)
        .returning("id")
    )[0];
  },
  createAndGet: async function(input) {
    return this.first({ id: await this.create(input) });
  }
});

// https://vladimir-ivanov.net/camelcase-to-snake_case-and-vice-versa-with-javascript/
function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}
function snakeToCamel(string) {
  return string.replace(/(_\w)/g, function(m) {
    return m[1].toUpperCase();
  });
}

module.exports = db => {
  const models = {
    players: buildModel(db, "players"),
    events: buildModel(db, "events"),
    games: buildModel(db, "games"),
    rounds: buildModel(db, "rounds")
  };
  models.players.createAndAvatar = async function(input) {
    const playerId = await models.players.create(input);
    const file = fs.createWriteStream(`./dist/img/players/${playerId}.jpg`);
    const response = await axios({
      url: "https://picsum.photos/200",
      method: "GET",
      responseType: "stream"
    });
    await response.data.pipe(file);
    return playerId;
  };
  models.players.getByEvent = async function(eventId) {
    const data = await db.raw(
      `SELECT DISTINCT players.*, COUNT(t2) AS score 
        FROM players
        LEFT JOIN (
          SELECT player_id, t1.round_id FROM (
            SELECT MAX(score), round_id 
            FROM round_players, rounds 
            WHERE rounds.event_id = ? AND round_players.round_id = rounds.id 
            GROUP BY round_id
            ) t1 
          JOIN round_players ON t1.max = round_players.score AND t1.round_id = round_players.round_id
        ) t2 ON t2.player_id = players.id
        INNER JOIN round_players ON round_players.player_id = players.id
        INNER JOIN rounds ON round_players.round_id = rounds.id
        WHERE rounds.event_id = ?
        GROUP BY (players.id)
        ORDER BY score DESC`,
      [eventId, eventId]
    );
    return data.rows;
  };
  models.players.getByRound = function(roundId) {
    return db("players")
      .select("players.*", "round_players.score")
      .join("round_players", "players.id", "=", "round_players.player_id")
      .where("round_players.round_id", roundId)
      .orderBy("round_players.score", "DESC");
  };
  models.rounds.getByPlayer = function(playerId) {
    return db("rounds")
      .select("rounds.*", "round_players.score")
      .join("round_players", "rounds.id", "=", "round_players.round_id")
      .where("round_players.player_id", playerId)
      .orderBy("id", "DESC");
  };
  models.games.getByEvent = function(eventId) {
    return db("games")
      .distinct("games.*")
      .join("rounds", "rounds.game_id", "=", "games.id")
      .where("rounds.event_id", eventId);
  };
  models.rounds.createAndGet = async function(input) {
    let game = await models.games.first({ name: input.game });
    game = game ? game.id : await models.games.create({ name: input.game });
    const players = [];
    for (let i of input.players) {
      const p = await models.players.first({ name: i });
      players.push(
        p ? p.id : await models.players.createAndAvatar({ name: i })
      );
    }
    const roundId = await this.create({
      eventId: input.eventId,
      gameId: game
    });

    for (let i in players) {
      await db("round_players").insert({
        round_id: roundId,
        player_id: players[i],
        score: input.playerScores[i]
      });
    }
    return this.first({ id: roundId });
  };
  return models;
};
