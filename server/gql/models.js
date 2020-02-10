buildModel = (db, tableName) => ({
  get: function(where = {}, orderBy = {}, joins = []) {
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

    return query;
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

module.exports = db => {
  const models = {
    players: buildModel(db, "players"),
    roundPlayers: buildModel(db, "round_players"),
    events: buildModel(db, "events"),
    games: buildModel(db, "games"),
    rounds: buildModel(db, "rounds")
  };
  models.players.getByEvent = function(eventId) {
    return db("players")
      .join("round_players", "players.id", "=", "round_players.player_id")
      .join("rounds", "round_players.round_id", "=", "rounds.id")
      .where("rounds.event_id", eventId);
  };
  models.rounds.createAndGet = async function(input) {
    let game = await models.games.first({ name: input.game });
    game = game ? game.id : await models.games.create({ name: input.game });
    const players = [];
    for (let i of input.players) {
      const p = await models.players.first({ name: i });
      players.push(p ? p.id : await models.players.create({ name: i }));
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
