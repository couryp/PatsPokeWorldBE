const knex = require('../db/connection.js')

function createUser(name){
  return knex('users').insert({name}, 'id')
}

function createSquad(body){
  return knex('squads').insert(body)
}

function createPokemon(body){
  return knex('pokemon').insert(body)
}

function getUserSquads(id){
  return knex('squads').where({user_id: id})
}

function deleteSquad(id){
  return knex('squads').where({id: id}).del().returning('*')
}

function getAllSquads(){
  return knex('squads')
}

module.exports = {
  createUser, createSquad, createPokemon, getUserSquads, deleteSquad, getAllSquads
}
