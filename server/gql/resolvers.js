module.exports = (models, db) => ({
  Event: {
    rounds: event => models.rounds.getByEvent.load(event.id),
    players: event => models.players.getByEvent.load(event.id),
    games: event => models.games.getByEvent.load(event.id)
  },
  Round: {
    event: round => models.events.first.load(round.eventId),
    players: round => models.players.getByRound.load(round.id),
    game: round => models.games.first.load(round.gameId)
  },
  Game: {
    rounds: game => models.rounds.getByGame.load(game.id)
  },
  Player: {
    rounds: player => models.rounds.getByPlayer.load(player.id)
  },
  Query: {
    players: (context, args) => models.players.get(args.where),
    events: (context, args) => models.events.get(args.where),
    games: (context, args) => models.games.get(args.where)
  },
  Mutation: {
    createEvent: (context, args) => models.events.create(args.input),
    createRound: (context, args) => models.rounds.create(args.input)
  }
});
