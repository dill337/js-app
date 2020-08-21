var pokemonRepository = (function () {
var pokemonList = [
  {
  creatureName: 'Bulbasaur',
  creatureHeight: .7,
  creatureWeight: 6.9,
  creatureType:['Grass', 'Poison']
  },
  {
  creatureName: 'Arbok',
  creatureHeight: 3.5,
  creatureWeight: 65,
  creatureType: 'Poison'
  },
  {
  creatureName: 'Charizard',
  creatureHeight: 1.7,
  creatureWeight: 90.5,
  creatureType: ['Fire', 'Flying']
  },
  {
  creatureName: 'Beedrill',
  creatureHeight: 1,
  creatureWeight: 29.5,
  creatureType: ['Bug', 'Poison']
  }
];

  function getAll(){
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon !== 'object');{
    return
    }
    const knownKeys = ['creatureName', 'creatureWeight', 'creatureType', 'creatureHeight']
   for (const key in Object.keys(pokemon)) {
       if (!knownKeys.includes(key)) {
          return
       }
   }
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    console.log(pokemon)
  };


  function addListItem(pokemon) {
    var poke = document.querySelector('.pokemon_list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.creatureName;
    button.classList.add('.button_color');
    listItem.appendChild(button);
    poke.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  };


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }
})();

pokemonRepository.getAll().forEach(function(pokemon)  {
  pokemonRepository.addListItem(pokemon)
});
