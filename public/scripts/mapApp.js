$(document).ready(function() {

  // TODO: ajax call to get one of the logged in users' maps and render it

});

// Draw the map to the screen
// Currently only draws the same map every time
// Will take an array parameter with coordinates to set initial view
//    first element will be latitude and second will be longitude
const renderMap = function(mapId) {
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

  // diable map zoom on double click
  map.doubleClickZoom.disable();

  // create layer group to hold markers
  const markers = L.layerGroup().addTo(map);

  // handler to add marker to map as well as corresponding point to sidebar list
  map.on("dblclick", function(pointer) {

    console.log(pointer);

    // Add point to map
    const marker = L.marker(pointer.latlng).addTo(markers);
    console.log(marker);
    // database query to create new point goes here

    // Add corresponding point element to sidebar list
    const $newPoint = $('<input>').attr('type', 'button');
    $newPoint.attr('name', Math.floor(Math.random() * 1000));
    $newPoint.val("a new point");
    $('.points-list').append($newPoint);
  });
};


