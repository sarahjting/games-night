exports.seed = function(knex) {
  return knex.schema.raw(
    `TRUNCATE TABLE 
        players,
        games,
        events,
        rounds,
        round_players
        RESTART IDENTITY`
  );
};
