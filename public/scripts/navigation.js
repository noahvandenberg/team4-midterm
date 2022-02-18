$(() => {

  $.get(`/api/maps/${window.location.pathname.replace("/maps/", "")}`, (map) => {
    $.get(`/api/points/m/${map[0].id}`, (points) => {
      console.log(points.length);
    });
    renderMap(map[0].id);
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

  // handler to submit point to database
  $('#myEditnav form').submit(function(event) {
    event.preventDefault();

    // build point object to send to database
    const creator_id = $(this).children('input[name="creator_id"]').val();
    const map_id = $(this).children('input[name="map_id"]').val();
    const latitude = $(this).children('input[name="latitude"]').val();
    const longitude = $(this).children('input[name="longitude"]').val();
    const title = $(this).children('input[name="title"]').val();
    const description = $(this).children('input[name="description"]').val();
    const image_url = $(this).children('input[name="image_url"]').val();

    const data = {
      creator_id,
      map_id,
      latitude,
      longitude,
      title,
      description,
      image_url
    };

    console.log(data)

    $.ajax({
      method: "POST",
      url: "/api/points",
      timeout: 0,
      data
    }).done(function(res) {
      console.log(res)
      removeMap();
      removePoints();
      renderMap(res[0].map_id);
      $('#myEditnav form').attr("hidden", "");
    });

  })

  // handler to
  $('#myEditnav > form > input[value="cancel"').on('click', function() {
    currentMarkers.removeLayer(currentMarkerId)
  })

});
