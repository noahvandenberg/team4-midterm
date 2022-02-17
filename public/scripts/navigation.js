$(() => {

  $.get('/maps/8', (maps) => {
    let mapTitles = '';
    for (const map of maps) {
      mapTitles += '<div class="mapName" id="' + map.id + '">' + map.title + '</div>';
    }
    $('.mapDisplay').html(mapTitles);
    renderMap(maps[0].id);
  });

  $(document).on('click', '.mapName', (function() {
    renderMap($(this).attr('id'));
  }));

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
