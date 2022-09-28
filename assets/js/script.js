var pokedex = document.querySelector('.pokedex');
var baseApi = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';
var arr = [];

// function for backgournd color
function bgColor(types) {
  var type;
  arr.forEach(function (color) {
    if (color == types) {
      type = types;
    }
  })
  return type;
}

// Showing Fetched Data
function showPokemon(result) {
  result.forEach(function (pokemon, ind) {

    // inner pokemon url fetch function for pokemon data
    fetch(pokemon.url)
    .then(function (response) {
      return response.json();
    })
    .then(function (url) {
      var data = url;
      var pokemonImg = data.sprites.other.dream_world.front_default;
      var types = data.types[0].type.name;
      arr.push(types);
      
      // Condition for Pokemon id
      var id = ind + 1;

      if (id < 10) {
        id = '00' + id;
      } else if (id < 100) {
        id = '0' + id;
      }

      // Template Littrels
      var li = document.createElement('li');
      li.classList.add('pokemon-card', bgColor(types));
      li.innerHTML = `
        <figure>
          <img class="pokemon-img" src="${pokemonImg}" alt="">
          <figcaption class="pokemon-info">
            <span class="number">#${id}</span>
            <h2 class="name ">${pokemon.name}</h2>
            <span class="type">Type: ${types}</span>
          </figcaption>
        </figure>
      `
      pokedex.append(li);
    })
  })
}

// Fetch Api Functon
function getPokemon(api) {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showPokemon(data.results);
    })
}
getPokemon(baseApi);
