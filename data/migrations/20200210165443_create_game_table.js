exports.up = function(knex) {
  return knex.schema.createTable("games", t => {
    t.increments().index();
    t.string("name", 100)
      .notNullable()
      .index();
    t.string("url", 500);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("games");
};
