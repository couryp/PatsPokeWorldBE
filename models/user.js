const knex = require('../db/connection.js')

function createUser(name){
  return knex('users').insert({name})
}

function createSquad(name){
  return knex('squads').insert({name})
}

function createPokemon(body){
  return knex('pokemon').insert(body)
}

// function getSquads(name){
//   return knex('users')
//     .join('users_squads', '')
// }


module.exports = {
  createUser, createSquad, createPokemon
}
