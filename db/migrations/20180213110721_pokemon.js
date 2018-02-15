
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokemon', table => {
    table.increments().notNullable()
    table.string('name').notNullable()
    table.integer('dex_id').notNullable()
    table.string('img').notNullable()
    table.integer('squad_id')
    table.foreign('squad_id').references('squads.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pokemon')
};
