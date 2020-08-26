var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function addListItem(pokemon) {
    var buttonList = document.querySelector('.pokemon_list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.creatureName;
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    })
    button.classList.add('.button_color');
    listItem.appendChild(button);
    buttonList.appendChild(listItem);
  };

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function(){
    console.log(pokemon);
    alert('height:' + ' ' + item.height + ' ' + 'Type: ' + ' ' + item.types);
  });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(error){
      console.error(error);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
