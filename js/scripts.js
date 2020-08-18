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
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  }
})();

console.log( pokemonRepository.getAll() );

pokemonRepository.getAll().forEach(function(list)  {
  document.write('<h2>' + list.creatureName + ' </h2>' + ' Height: ' + list.creatureHeight)
 if (list.creatureHeight >= 3.00) {
  document.write(' (That\'s pretty big)')
  }
});
