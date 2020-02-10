module.exports = (models, db) => ({
  Event: {
    rounds: event => models.rounds.get({ eventId: event.id }),
    players: event => models.players.getByEvent(event.id)
  },
  Round: {
    event: round => models.events.first({ id: round.event_id }),
    players: round => models.roundPlayers.get({ roundId: round.id }),
    game: round => models.games.first({ id: round.game_id })
  },
  RoundPlayer: {
    player: roundPlayer => models.players.first({ id: roundPlayer.player_id }),
    round: roundPlayer => models.rounds.first({ id: roundPlayer.round_id })
  },
  Game: {
    rounds: game => models.rounds.get({ gameId: game.id })
  },
  Player: {
    rounds: (player, args = {}) =>
      models.roundPlayers.get(
        { ...args, playerId: player.id },
        { "rounds.id": "DESC" },
        [["rounds", "rounds.id", "round_players.round_id"]]
      )
  },
  Query: {
    players: (context, args) => models.players.get(args.where, { name: "ASC" }),
    events: (context, args) => models.events.get(args.where, { id: "DESC" }),
    games: (context, args) => models.games.get(args.where, { name: "ASC" })
  },
  Mutation: {
    createPlayer: (context, args) => models.players.createAndGet(args.input),
    createGame: (context, args) => models.games.createAndGet(args.input),
    createEvent: (context, args) => models.events.createAndGet(args.input),
    createRound: (context, args) => models.rounds.createAndGet(args.input)
  }
});
