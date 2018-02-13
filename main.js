const Pokedex = require('pokedex-promise-v2');
const Poke = new Pokedex();

Poke.getPokemonByName(4)
    .then(function(response) {
      //console.log(response);
      console.log(response.name, response.id, response.sprites.front_default)
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
