const axios = require("axios");
const fs = require("fs");
const DataLoader = require("dataloader");

module.exports = db => {
  /* MODELS */
  const models = {
    players: {
      get: async function() {
        return await db("players").orderBy("id", "DESC");
      },
      first: new DataLoader(async ids => {
        let data = await db("players").whereIn("id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.find(x => x.id === id));
      }),
      getByEvent: new DataLoader(async ids => {
        const data = await db.raw(
          `SELECT DISTINCT players.*, rounds.event_id, COUNT(t2) AS score 
            FROM players
            LEFT JOIN (
              SELECT player_id, t1.round_id FROM (
                  SELECT MAX(score), round_id 
                  FROM round_players, rounds 
                  WHERE rounds.event_id IN (??) AND round_players.round_id = rounds.id 
                  GROUP BY round_id
                ) t1 
              JOIN round_players ON t1.max = round_players.score AND t1.round_id = round_players.round_id
            ) t2 ON t2.player_id = players.id
            INNER JOIN round_players ON round_players.player_id = players.id
            INNER JOIN rounds ON round_players.round_id = rounds.id
            WHERE rounds.event_id IN (??)
            GROUP BY (players.id, rounds.event_id)
            ORDER BY score DESC`,
          [ids, ids]
        );
        data.rows = data.rows.map(objectToCamel);
        return ids.map(id => data.rows.filter(x => x.eventId == id));
      }),
      getByRound: new DataLoader(async ids => {
        let data = await db("players")
          .select("players.*", "round_players.round_id", "round_players.score")
          .join("round_players", "round_players.player_id", "=", "players.id")
          .whereIn("round_players.round_id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.roundId === id));
      })
    },

    /** EVENTS MODEL **/
    events: {
      get: async function() {
        let data = await db("events").orderBy("id", "DESC");
        return data.map(objectToCamel);
      },
      first: new DataLoader(async ids => {
        let data = await db("events").whereIn("id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.find(x => x.id === id));
      })
    },

    /** GAMES MODEL **/
    games: {
      get: async function(where) {
        let data = db("games").orderBy("name", "ASC");
        if (Object.keys(where).length) data = data.where(where);
        data = await data;
        return data.map(objectToCamel);
      },
      first: new DataLoader(async ids => {
        let data = await db("games").whereIn("id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.find(x => x.id === id));
      }),
      getByEvent: new DataLoader(async ids => {
        let data = await db("games")
          .select("games.*", "rounds.event_id")
          .join("rounds", "rounds.game_id", "=", "games.id")
          .whereIn("rounds.event_id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.eventId === id));
      }),
      getByGame: new DataLoader(async ids => {
        let data = await db("rounds").whereIn("rounds.game_id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.gameId === id));
      }),
      getByPlayer: new DataLoader(async ids => {
        let data = await db("rounds")
          .select("rounds.*", "round_players.player_id", "round_players.score")
          .join("round_players", "round_players.round_id", "=", "rounds.id")
          .whereIn("round_players.player_id", ids)
          .orderBy("id", "DESC");
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.playerId === id));
      })
    },

    /** ROUNDS MODEL **/
    rounds: {
      first: new DataLoader(async ids => {
        let data = await db("rounds").whereIn("rounds.id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.find(x => x.id === id));
      }),
      getByEvent: new DataLoader(async ids => {
        let data = await db("rounds").whereIn("rounds.event_id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.eventId === id));
      }),
      getByGame: new DataLoader(async ids => {
        let data = await db("rounds").whereIn("rounds.game_id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.gameId === id));
      }),
      getByPlayer: new DataLoader(async ids => {
        let data = await db("rounds")
          .select("rounds.*", "round_players.player_id", "round_players.score")
          .join("round_players", "round_players.round_id", "=", "rounds.id")
          .whereIn("round_players.player_id", ids);
        data = data.map(objectToCamel);
        return ids.map(id => data.filter(x => x.playerId === id));
      })
    }
  };

  /** MUTATIONS **/
  models.players.create = async function(input) {
    const insert = objectToSnake(input);
    const result = await db("players")
      .insert(insert)
      .returning("id");
    return models.players.first.load(result[0]);
  };
  models.players.createAndAvatar = async function(input) {
    const player = await models.players.create(input);
    const file = fs.createWriteStream(`./dist/img/players/${player.id}.jpg`);
    const response = await axios({
      url: "https://picsum.photos/200",
      method: "GET",
      responseType: "stream"
    });
    await response.data.pipe(file);
    return player;
  };
  models.games.create = async function(input) {
    const insert = objectToSnake(input);
    const result = await db("games")
      .insert(insert)
      .returning("id");
    return models.games.first.load(result[0]);
  };
  models.events.create = async function(input) {
    const insert = objectToSnake(input);
    const result = await db("events")
      .insert(insert)
      .returning("id");
    return models.events.first.load(result[0]);
  };
  models.rounds.create = async function(input) {
    let game = await db("games").where("name", input.game);
    if (game.length) game = game[0];
    else game = await models.games.create({ name: input.game });
    const players = [];
    for (let i of input.players) {
      let p = await db("players").where("name", i);
      if (p.length) p = p[0];
      else p = await models.players.createAndAvatar({ name: i });
      players.push(p.id);
    }

    const roundId = (
      await db("rounds")
        .insert({ event_id: input.eventId, game_id: game.id })
        .returning("id")
    )[0];

    for (let i in players) {
      await db("round_players").insert({
        round_id: roundId,
        player_id: players[i],
        score: input.playerScores[i]
      });
    }
    return this.first.load(roundId);
  };
  return models;
};

/** UTILITY **/
let queries = 0;

function objectToSnake(obj) {
  const insert = {};
  for (const i of Object.keys(obj)) insert[camelToSnake(i)] = obj[i];
  return insert;
}

function objectToCamel(obj) {
  const insert = {};
  for (const i of Object.keys(obj)) insert[snakeToCamel(i)] = obj[i];
  return insert;
}

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
