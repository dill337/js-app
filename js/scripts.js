
var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



  function add(pokemon) {
    if (typeof pokemon !== 'object'){
    return
    }
    const knownKeys = ['name', 'detailsUrl']
   for (const key in Object.keys(pokemon)) {
       if (knownKeys.includes(key)) {
          return
       }
   }
    pokemonList.push(pokemon);
  }

  function getAll(){
    return pokemonList;
  }


  function showDetails(pokemon) {
     pokemonRepository.loadDetails(pokemon).then(function(){
       console.log(pokemon)
       var modal = document.querySelector('#modal-container');
       var name = document.createElement('h2');
       var pname = document.createTextNode(pokemon.name);
       name.appendChild(pname);
       modal.appendChild(name);
       var closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
      modal.appendChild(closeButtonElement);
        closeButtonElement.addEventListener('click', hideModal);
       var heightP = document.createElement('p');
       var height = document.createTextNode(`Height: ${pokemon.height}`);
       heightP.appendChild(height)
       modal.appendChild(heightP);
       console.log(pokemon.types)
       pokemon.types.forEach((type) => {
         var typeElement = document.createElement('span');
         typeElement.innerText = type.type.name;
         modal.appendChild(typeElement)
       })
       modal.setAttribute('id', 'modal-container-is-visible')
       var image = document.createElement('img')
       image.src = pokemon.imageUrl
       modal.appendChild(image);
     });
   }


   function hideModal() {
     var modal = document.querySelector('#modal-container-is-visible');
     modal.setAttribute('id','modal-container');
        while(modal.firstChild){
         modal.removeChild(modal.firstChild);
     }
   }

   window.addEventListener('keydown', (e) => {
  var modalContainer = document.querySelector('#modal-container-is-visible');
  if (e.key === 'Escape' && modalContainer) {
    hideModal();
  }
});

   function addListItem(pokemon) {
      var poke = document.querySelector('.pokemon_list');
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('.button_color');
      listItem.appendChild(button);
      poke.appendChild(listItem);
      button.addEventListener('click', function (event) {
        showDetails(pokemon);


      });
    };


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
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(error){
      console.error(error);
    });
  }

  function catchAll(){
    return repository;
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
