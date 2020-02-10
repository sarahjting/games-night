exports.up = function(knex) {
  return knex.schema
    .createTable("events", t => {
      t.increments().index();
      t.string("name", 100)
        .notNullable()
        .index();
      t.timestamp("created_at")
        .defaultTo(knex.fn.now())
        .notNullable()
        .index();
    })
    .then(() => {
      return knex.schema.createTable("rounds", t => {
        t.increments().index();
        t.integer("event_id").references("events.id");
        t.integer("game_id")
          .notNullable()
          .references("games.id");
        t.timestamp("created_at")
          .defaultTo(knex.fn.now())
          .notNullable();
        t.index(["event_id", "created_at"]);
        t.index(["game_id", "created_at"]);
      });
    })
    .then(() => {
      return knex.schema.createTable("round_players", t => {
        t.increments().index();
        t.integer("round_id")
          .notNullable()
          .references("rounds.id");
        t.integer("player_id")
          .notNullable()
          .references("players.id");
        t.integer("score").defaultTo(null);
      });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("round_players")
    .then(() => {
      return knex.schema.dropTable("rounds");
    })
    .then(() => {
      return knex.schema.dropTable("events");
    });
};
