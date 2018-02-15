
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('squads_pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('squads_pokemon').insert([
        {id: 1, squad_id: 1, pokemon_id: 43},
        {id: 2, squad_id: 2, pokemon_id: 79},
        {id: 3, squad_id: 3, pokemon_id: 54}
      ])
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('squads_pokemon_id_seq', (SELECT MAX(id) FROM squads_pokemon));`
      )
    })
};
