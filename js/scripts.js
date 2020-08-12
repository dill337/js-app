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

for (var i = 0; i < pokemonList.length; i++) {
  document.write('<h2>' + pokemonList[i].creatureName + ' </h2>' + ' Height: ' + pokemonList[i].creatureHeight)
 if (pokemonList[i].creatureHeight >= 3.00) {
  document.write(' (That\'s pretty big)')
  }
}
