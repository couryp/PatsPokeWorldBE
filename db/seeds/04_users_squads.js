
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_squads').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_squads').insert([
        {id: 1, user_id: 1, squad_id: 1},
        {id: 2, user_id: 2, squad_id: 2},
        {id: 3, user_id: 3, squad_id: 3}
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('users_squads_id_seq', (SELECT MAX(id) FROM users_squads));`
      )
    })
};
