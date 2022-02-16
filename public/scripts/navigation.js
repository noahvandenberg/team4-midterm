$(() => {

  $.get('/maps/8', (maps) => {
    let mapTitles = '';
    for (const map of maps) {
      mapTitles += '<div class="mapName">' + map.title + '</div>';
    }
    $('.mapDisplay').html(mapTitles);
    renderMap(maps[0].id);
  });

  $('#openEditPane').click(() => {
    if ($('#myEditnav').width() === 0) {
      $('#myEditnav').width('200px');
    } else $('#myEditnav').width('0px');
  });

  $('#myEditnav').click(() => {
    if ($('#myEditnav').width() === 0) {
      $('#myEditnav').width('200px');
    } else $('#myEditnav').width('0px');
  });
});
