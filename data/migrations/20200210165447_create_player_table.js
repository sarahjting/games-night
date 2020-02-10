exports.up = function(knex) {
  return knex.schema.createTable("players", t => {
    t.increments().index();
    t.string("name", 50)
      .notNullable()
      .index();
    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("players");
};
