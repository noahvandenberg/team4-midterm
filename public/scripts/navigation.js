$(() => {

  // Adjust the text for the main entrance button when the header Login button is clicked
  // and set the input fields to a known user, check the Remember Me button
  $('#headerLoginButton').click(() => {
    $('#floatingInput').val('Lotte_Willems@gmail.com');
    $('#floatingPassword').val('password');
    $('#rememberUserCheck').prop('checked', true);
    $('#entranceMainButton').text('Login');
  });

  // Handle the main entrance click, if text is Login use the Login route or a Sign Up modal if it's Sign-up
  $('#entranceMainButton').click(function() {
    if ($('#entranceMainButton').text() === 'Login') {
      const userId = findUser('email', $('#floatingInput').val());
      console.log(userId);
    }
  });

  // $.get('/maps/8', (maps) => {
  //   let mapTitles = '';
  //   for (const map of maps) {
  //     mapTitles += '<div class="mapName" id="' + map.id + '>' + map.title + '</div>';
  //   }
  //   $('.mapDisplay').html(mapTitles);
  //   renderMap(maps[0].id);
  // });

  $(document).on('click', '.mapName', (function() {
    $('#map').remove();
    const $map = $('<section>').attr('id', 'map');
    $('#mySidenav').after($map);
    renderMap($(this).attr('id'));
  }));

  $('#logout').click(() => {
    console.log('logout clicked');
    $.ajax({
      method: 'POST',
      url: '/users/logout'})
      .then(console.log('get call finished'));
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
