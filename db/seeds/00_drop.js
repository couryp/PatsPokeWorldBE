
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('squads').del())
    .then(() => knex('pokemon').del())
    .then(() => knex('users_squads').del())
    .then(() => knex('squads_pokemon').del())
};
