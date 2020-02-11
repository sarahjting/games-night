const { gql } = require("apollo-server-express");
module.exports = gql`
  type Player {
    id: Int
    name: String
    score: Int
    rounds(gameId: Int): [Round]
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
    games: [Game]
    players: [Player]
  }
  type Round {
    id: Int
    event: Event
    players: [Player]
    gameId: Int
    game: Game
    createdAt: String
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
