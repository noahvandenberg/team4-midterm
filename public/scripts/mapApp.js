$(document).ready(function() {

  // Draw the map to the screen
  const renderMap = function() {
    // Sets Map and it's initial location
    const map = L.map('map').setView([49.13068254312452, -123.14892282607158], 13);

    // Grabs titles (background images) for mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoibm9haHZhbmRlbmJlcmciLCJhIjoiY2t6ajRtazg2MGs5bjJwbnlveTFoN2cwaSJ9.fzC2TyqKFe8sidsYJlVzdQ'
    }).addTo(map);
  };

  // Handler to add a new map to page
  // Currently no db implementation
  $('.add-map').on("click", function() {
    console.log(this);
    // Create button element for new map
    const newMapInput = $('<input>').attr('type', 'button');

    // Add map id and map name to button attribute name based on map object
    // not implemented yet
    newMapInput.attr('name', 'map-id');
    newMapInput.attr('value', 'A new map');

    // insert map input to html page
    $(this).parent().append(newMapInput);

    // render the newly created map
    $('#map').remove();
    const $map = $('<section>').attr('id', 'map');
    $('main').append($map);
    renderMap();
  })

  // Handler to select existing map and render it
  // currently no db implementation


});
