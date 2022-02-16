const { findUserMaps } = require('../../db/map-queries');

$(() => {

  $('#mySidenav').click(() => {
    console.log($('#mySidenav').width());
    if ($('#mySidenav').width() === 10) {
      $('#mySidenav').width('300px');
      let maps = findUserMaps();
      console.log(maps);
    } else $('#mySidenav').width('10px');
  });
});
