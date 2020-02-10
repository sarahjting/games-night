const config = require("./config");
module.exports = {
  client: "pg",
  connection: config.db.connection,
  migrations: {
    tableName: "knex_migrations",
    directory: "./data/migrations"
  },
  seeds: {
    directory: "./data/seeds"
  }
};
