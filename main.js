const Pokedex = require('pokedex-promise-v2');
const Poke = new Pokedex();


class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.sprites = data.sprites.front_default;
  }
}

function getPokemonByID (id) {
  console.log('silly test')
  return Poke.getPokemonByName(id)
      .then(function(response) {
        console.log('inside main.js poke func')
        return new Pokemon(response);
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
      });
}

module.exports = {
  getPokemonByID
}
