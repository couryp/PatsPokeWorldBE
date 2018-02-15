
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('squads').del()
    .then(function () {
      // Inserts seed entries
      return knex('squads').insert([
        {id: 1, name: 'Squirtle Squad'},
        {id: 2, name: 'Team Rocket'},
        {id: 3, name: 'Pika Pals'}
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('squads_id_seq', (SELECT MAX(id) FROM squads));`
      )
    })
};
