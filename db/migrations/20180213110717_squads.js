
exports.up = function(knex, Promise) {
  return knex.schema.createTable('squads', table => {
    table.increments().notNullable()
    table.string('name').notNullable().defaultsTo('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('squads')
};
