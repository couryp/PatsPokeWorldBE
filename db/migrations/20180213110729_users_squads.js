
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_squads', table => {
    table.increments().notNullable()
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('squad_id').notNullable()
    table.foreign('squad_id').references('squads.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_squads')
};
