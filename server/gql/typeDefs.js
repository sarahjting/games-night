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
  input GameCreateInput {
    name: String!
  }
  input PlayerWhereInput {
    name: String
  }
  input PlayerCreateInput {
    name: String!
  }
  input EventWhereInput {
    id: Int
  }
  input EventCreateInput {
    name: String!
  }
  input RoundCreateInput {
    eventId: Int
    game: String
    players: [String]
    playerScores: [Int]
  }
  type Query {
    players(where: PlayerWhereInput): [Player]
    events(where: EventWhereInput): [Event]
    games(where: GameWhereInput): [Game]
  }
  type Mutation {
    createPlayer(input: PlayerCreateInput!): Player
    createGame(input: GameCreateInput!): Game
    createEvent(input: EventCreateInput!): Event
    createRound(input: RoundCreateInput!): Round
  }
`;
