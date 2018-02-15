
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {id: 1, name: 'Oddish', dex_id: 43},
        {id: 2, name: 'Slowpoke', dex_id: 79},
        {id: 3, name: 'Psyduck', dex_id: 54}
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('pokemon_id_seq', (SELECT MAX(id) FROM pokemon));`
      )
    })
};