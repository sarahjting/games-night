require("dotenv").config();
const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");

// db set up
const knex = require("knex");
const config = require("../knexfile");
const db = knex(config);

// express setup
const app = express();

// Apollo server setup
const models = require("./gql/models")(db);
const typeDefs = require("./gql/typeDefs.js");
const resolvers = require("./gql/resolvers.js")(models, db);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});
server.applyMiddleware({ app, path: "/api" });

app.get(/(.*)/, (req, res) => {
  const uri = req.params[0] === "/" ? "/index.html" : req.params[0];
  res.sendFile(path.join(getPublicPath(uri)), err => {
    if (!err) {
      console.log(`200 🐑 ${uri}:`);
    } else {
      console.log(`${err.status} 🐐 ${uri}: ${err.message}`);
    }
  });
});
app.listen({ port: process.env.PORT }, () => {
  console.log(`🎲 Happy gaming! http://localhost:${process.env.PORT}`);
  console.log(
    `🎲 GraphQL playground! http://localhost:${process.env.PORT}/api`
  );
});

function getPublicPath(fileName) {
  return path.join(`${__dirname}/../dist/${fileName}`);
}
