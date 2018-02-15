
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokemon', table => {
    table.increments().notNullable()
    table.string('name').notNullable()
    table.integer('dex_id').notNullable()
    table.string('img').notNullable()
    //.unique() for ^^^^^
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pokemon')
};
