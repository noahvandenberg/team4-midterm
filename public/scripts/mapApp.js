$(document).ready(function() {

  const renderMap = function() {
    // Sets Map and it's initial location
    var map = L.map('map').setView([49.13068254312452, -123.14892282607158], 13);

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

  renderMap();
});
