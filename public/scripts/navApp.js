$(document).ready(function() {

  addUserMaps();

  // Handlers

  // Handler to add a new map to page
  // does not yet make database call
  $('.add-map').on("click", function() {
    const map = {};
    map.creator_id = 1;
    map.description = "map decription";
    map.title = "map title";
    map.time_created = Date.now();

    // randomly generated id for now
    map.id = Math.floor(Math.random() * 10000);

    addMap(map);
    $('#map').remove();
    const $map = $('<section>').attr('id', 'map');
    $('main').append($map);
    $('.points-list').empty();
    renderMap();
  });

  // Handler to select existing map and render it
  // currently no db implementation, just rerenders the map when clicked
  // will query the database using map id stored in "name" attribute of input
  $('div.maps-list').on("click", "input[name]", function() {

    // this is the map id used to query the database
    console.log($(this).attr('name'));
    // remove the current map and rerender it
    $('#map').remove();
    const $map = $('<section>').attr('id', 'map');
    $('main').append($map);
    $('.points-list').empty();
    renderMap();
  });

});

// function definitions

// helper function to add a map to the nav sidebar
// takes a map object and creates a map input element to add to DOM
const addMap = function(map) {
  // Create button element for new map
  const newMapInput = $('<input>').attr('type', 'button');

  // Add map id and map name to button attribute name based on map object
  // not implemented yet
  newMapInput.attr('name', map.id);
  newMapInput.attr('value', map.title);

  // insert map input to html page
  $('.maps-list').append(newMapInput);
};

// Add the user maps to nav sidebar based on the user id set in the cookie
// currently just gets the maps for userId 1
const addUserMaps = function() {

  const userId = 1;

  return $.ajax({
    method: "GET",
    url: `/maps/${userId}`
  }).then((res) => {
    // Add each man to the sidebar
    res.maps.forEach(map => {
      addMap(map);
    });

    // render the user's first map in the database
    renderMap();
  });
};
