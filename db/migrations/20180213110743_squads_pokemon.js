
exports.up = function(knex, Promise) {
  return knex.schema.createTable('squads_pokemon', table => {
    table.increments().notNullable()
    table.integer('squad_id').notNullable()
    table.foreign('squad_id').references('squads.id').onDelete('CASCADE')
    table.integer('pokemon_id').notNullable()
    table.foreign('pokemon_id').references('pokemon.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('squads_pokemon')
};
