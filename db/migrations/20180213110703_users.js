
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().notNullable()
    table.string('name').notNullable().unique()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
