$(document).ready(function() {

  // TODO: ajax call to get one of the logged in users' maps and render it

});

// Draw the map to the screen
// takes a mapId to query database
const renderMap = function(mapId) {
  // hardcoded map for now
  mapId = 7;

  return $.ajax({
    method: "GET",
    url: `/points/${mapId}`
  }).then((data) => {
    // Sets Map and it's initial location
    const initialLat = data.points[0].latitude;
    const initialLng = data.points[0].longitude;
    const map = L.map('map').setView([initialLat, initialLng], 13);

    // create layer group to hold markers
    const markers = L.layerGroup().addTo(map);

    // go through points and add them to the map
    data.points.forEach((point) => {
      const lat = point.latitude;
      const lng = point.longitude;
      const latlng = { lat, lng };
      const marker = L.marker(latlng).addTo(markers);
      addPointToSidebar(point);
    });

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


    // handler to add marker to map as well as corresponding point to sidebar list
    map.on("dblclick", function(pointer) {

      console.log(pointer);

      // Add point to map
      const marker = L.marker(pointer.latlng).addTo(markers);
      console.log(marker);

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
    });

  })

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
  const $editForm = $('#myEditNav');
  $editForm.children('input[name="creator_id"]').val(point.creator_id);
  $editForm.children('input[name="map_id"]').val(point.map_id);
  $editForm.children('input[name="latitude"]').val(point.latitude);
  $editForm.children('input[name="longitude"]').val(point.longitude);
};
