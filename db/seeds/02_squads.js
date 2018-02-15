
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('squads').del()
    .then(function () {
      // Inserts seed entries
      return knex('squads').insert([
        {id: 1, name: 'Oak Squad', user_id: 1},
        {id: 2, name: 'Gary Squad', user_id: 2},
        {id: 3, name: 'Pika Pals', user_id: 3}
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('squads_id_seq', (SELECT MAX(id) FROM squads));`
      )
    })
};
