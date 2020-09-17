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
    let modal = $('#modal-container');
    let modalHeading = $('#pokemonModalLabel');
    let modalBody = $('.modal-body');
    modalHeading.html("");
    modalBody.html("");
     pokemonRepository.loadDetails(pokemon).then(function(){
       console.log(pokemon)
       modalHeading.text(`This is ${pokemon.name}`);

       let height = $('<p></p>');
       height.text(`Height: ${pokemon.height} meters`);

       let weight = $('<p></p>');
       weight.text(`Weight: ${pokemon.weight} lbs`)

       let image = $('<img></img>');
       image.attr('src', pokemon.imageUrl);

       pokemon.types.forEach((type) => {
         let typeElement = $('<span></span>');
         typeElement.text(type.type.name);
         $(modalBody).append(typeElement)
       })

       $(modalBody).append(height);
       $(modalBody).append(weight);
       $(modalBody).append(image);

     });
   }

   function hideModal() {
     var modal =  document.querySelector('#modal-container-is-visible');
     modal.setAttribute('id','modal-container');
        while(modal.firstChild){
         modal.removeChild(modal.firstChild);
     }
   };


$(window).on('keydown', function(e) {
var modalContainer = $('#modal-container-is-visible');
if (e.key === 'Escape' && modalContainer) {
  hideModal();
}
});

   function addListItem(pokemon) {
      var poke = $('.pokemon_list');
      var listItem = $('<li></li>');
      var button = $(`<button type="button" class="btn btn-primary pokemonHover" data-toggle="modal"
      data-target="#pokemonModal">${pokemon.name}</button>`);
      $(listItem).append(button);
      $(poke).append(listItem);
      $(button).on('click', function (event) {
        showDetails(pokemon);


      });
    };

   /*function loadList() {
      return $.ajax({url:apiUrl}).then(function (response) {
        return response.json();
      }).then(function (json) {
        forEach(let item in json.results){
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        }
      }).catch(function (e) {
        console.error(e);
      })
    }*/

  /*function loadList() {
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
  }*/

  function loadList() {
    return $.ajax({url:apiUrl}).done(function (response) {
      return JSON.stringify(response);
    }).done(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).fail(function (e) {
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
      item.weight = details.weight;
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
