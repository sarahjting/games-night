const { gql } = require("apollo-server-express");
module.exports = gql`
  type Player {
    id: Int
    name: String
    rounds(gameId: Int): [RoundPlayer]
  }
  type Game {
    id: Int
    name: String
    url: String
    rounds: [Round]
  }
  type Event {
    id: Int
    name: String
    createdAt: String
    rounds: [Round]
    players: [Player]
  }
  type Round {
    id: Int
    event: Event
    players: [RoundPlayer]
    gameId: Int
    game: Game
    createdAt: String
    winner: Player
  }
  type RoundPlayer {
    round: Round
    player: Player
    score: Int
  }
  input GameWhereInput {
    name: String
  }
  input PlayerWhereInput {
    name: String
  }
  input EventWhereInput {
    id: Int
  }
  type Query {
    players(where: PlayerWhereInput): [Player]
    events(where: EventWhereInput): [Event]
    games(where: GameWhereInput): [Game]
  }
`;
