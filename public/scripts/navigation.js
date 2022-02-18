$(() => {

  $.get(`/api/maps/${window.location.pathname.replace("/maps/", "")}`, (map) => {
    $.get(`/api/points/m/${map[0].id}`, (points) => {
      console.log(points.length);
      let pointInfo = '';
      for (const point of points) {
        pointInfo += `
        <a href="#" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true" id="mapPoint">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">${point.title}</strong>
        </div>
        <div class="col-10 mb-1 small">${point.description}</div>
        </a>`;
        console.log(point.title);
        $('#mapPointsList').html(pointInfo);
      }
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

    // alert user if form is empty
    if ($(this).children('input[name="title"]').val() === "" ||
      $(this).children('input[name="description"]').val() === "" ||
      $(this).children('input[name="image_url"]').val() === "") {

      alert("Please enter point information.")
      return;
    }

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

    console.log(data);

    $.ajax({
      method: "POST",
      url: "/api/points",
      timeout: 0,
      data
    }).done(function(res) {
      console.log(res);
      removeMap();
      removePoints();
      renderMap(res[0].map_id);
      $('#myEditnav form').attr("hidden", "");
    });

  });

  // handler to remove current marker if cancel is clicked
  $('#myEditnav > form > input[value="cancel"').on('click', function() {
    currentMarkers.removeLayer(currentMarkerId)
    $(this).siblings('input[type="hidden"]').val('');
    $(this).siblings('input[type="text"]').val('');
  })

});
