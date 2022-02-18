$(document).ready(function() {

  // TODO: ajax call to get one of the logged in users' maps and render it

});
let currentMarkers;
let currentMarkerId;

// Draw the map to the screen
// takes a mapId to query database
// returns the map object
const renderMap = function(mapId) {
  return $.ajax({
    method: "GET",
    url: `/api/points/m/${mapId}`
  }).then((data) => {
    console.log(data);
    // Create map
    const map = L.map('map');

    // create layer group to hold markers
    const markers = L.featureGroup().addTo(map);
    // go through points and add them to the map
    data.forEach((point) => {
      const marker = buildMarker(point);
      marker.bindPopup(buildPopup(point));

      // add to markers layer group
      marker.addTo(markers);

      addPointToSidebar(point);
    });
    currentMarkers = markers

    map.fitBounds(markers.getBounds());

    // Grabs titles (background images) for mapbox
    const mapTiles = buildMapTiles().addTo(map);

    map.doubleClickZoom.disable();


    //--- assign map handlers ---


    // handler to add marker to map as well as corresponding point to sidebar list
    map.on("dblclick", function(pointer) {
      // If there is a currently unsaved marker created, delete it first
      markers.removeLayer(currentMarkerId);

      // Add point to map
      const marker = L.marker(pointer.latlng).addTo(markers);
      currentMarkerId = marker._leaflet_id;
      console.log(currentMarkerId);

      // build point object to send to sidebar form for submission
      // currently hard coded to user id 8
      const creator_id = 8;
      const map_id = mapId;
      const latitude = pointer.latlng.lat;
      const longitude = pointer.latlng.lng;

      const point = {
        creator_id,
        map_id,
        latitude,
        longitude
      }

      addPointToEditForm(point);
      $('#myEditnav form').removeAttr("hidden");
    });

  });

};

// add map point to sidebar
// takes a point object

const addPointToSidebar = function(point) {
  const $newPoint = $('<input>').attr('type', 'button');
  $newPoint.attr('name', point.id);
  $newPoint.val(point.title);
  $('#myEditnav').append($newPoint);
};

// helper function to populate values in edit sidebar form
const addPointToEditForm = function(point) {
  const $editForm = $('#myEditnav');
  $editForm.find('input[name="id"]').val(point.id);
  $editForm.find('input[name="creator_id"]').val(point.creator_id);
  $editForm.find('input[name="map_id"]').val(point.map_id);
  $editForm.find('input[name="latitude"]').val(point.latitude);
  $editForm.find('input[name="longitude"]').val(point.longitude);
  $editForm.find('input[name="title"]').val(point.title);
  $editForm.find('input[name="description"]').val(point.description);
  $editForm.find('input[name="image_url"]').val(point.image_url);

};

// helper function to build marker
// takes a point object and returns a marker with the point's lat and lng
const buildMarker = function(point) {
  // build latlng to pass into marker object
  const lat = point.latitude;
  const lng = point.longitude;
  const latlng = { lat, lng };
  const marker = L.marker(latlng)

  return marker;
}

// helper function to build a popup for a marker based on a point object
// takes a point object and returns a string with html for the popup
const buildPopup = function(point) {
  const popupString = `
    <b>${point.title}</b>
    <br>
    ${point.description}
    <br>
    <img src="${point.image_url}" width="300">
  `
  return popupString;
}

// helper function to generate map tiles
// returns a leaflet tile layer object
const buildMapTiles = function() {
  const mapTiles = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoibm9haHZhbmRlbmJlcmciLCJhIjoiY2t6ajRtazg2MGs5bjJwbnlveTFoN2cwaSJ9.fzC2TyqKFe8sidsYJlVzdQ'
    }
  );

  return mapTiles;
};

// helper function to remove the map before redrawing it
const removeMap = function() {
  $('#map').remove();
  const $newMap = $('<section>').attr("id", "map")
  $('main').append($newMap);
};

// helper function to clear sidebar points
const removePoints = function() {
  $('#myEditnav form').nextAll('input').remove();
};

const toggleEditForm = function() {
  $('#myEditnav form').removeAttr("hidden");
};
