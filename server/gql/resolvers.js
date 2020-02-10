module.exports = db => ({
  Event: {
    rounds: event => db("rounds").where("rounds.event_id", event.id),
    players: event =>
      db("players")
        .join("round_players", "players.id", "=", "round_players.player_id")
        .join("rounds", "round_players.round_id", "=", "rounds.id")
        .where("rounds.event_id", event.id)
  },
  Round: {
    players: round => db("round_players").where("round_id", round.id),
    game: round =>
      db("games")
        .where("id", round.game_id)
        .first()
  },
  RoundPlayer: {
    player: roundPlayer =>
      db("players")
        .where("id", roundPlayer.player_id)
        .first(),
    round: roundPlayer =>
      db("rounds")
        .where("id", roundPlayer.round_id)
        .first()
  },
  Game: {
    rounds: game => db("rounds").where("rounds.game_id", game.id)
  },
  Player: {
    rounds: (player, args) => {
      const query = db("rounds")
        .join("round_players", "rounds.id", "=", "round_players.round_id")
        .where("round_players.player_id", player.id)
        .orderBy("rounds.id", "DESC");
      if (args.gameId) query.where("game_id", args.gameId);
      return query;
    }
  },
  Query: {
    players: (context, args) => {
      const query = db("players").orderBy("name", "ASC");
      if (args.where && Object.keys(args.where).length) query.where(args.where);
      return query;
    },
    events: (context, args) => {
      const query = db("events").orderBy("id", "DESC");
      if (args.where && Object.keys(args.where).length) query.where(args.where);
      return query;
    },
    games: (context, args) => {
      const query = db("games").orderBy("name", "ASC");
      if (args.where && Object.keys(args.where).length) query.where(args.where);
      return query;
    }
  }
});
