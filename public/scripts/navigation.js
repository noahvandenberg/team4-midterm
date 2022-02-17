$(() => {

  $.get('/maps/8', (data) => {
    let mapTitles = '';
    for (const map of data.maps) {
      mapTitles += '<div class="mapName" id="#' + map.id + '">' + map.title + '</div>';
    }
    $('.mapDisplay').html(mapTitles);
    renderMap(data.maps[0].id);
  });

  $(document).on('click', '.mapName', (function() {
    console.log($(this).attr('id'));
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
    } //else $('#myEditnav').width('0px');
  });
});
