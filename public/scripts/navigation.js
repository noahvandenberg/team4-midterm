$(() => {

  $('#mySidenav').click(() => {
    if ($('#mySidenav').width() === 10) {
      console.log(document.cookie);
      $.get('/maps/8', (maps, status) => console.log(status, maps));
      $('#mySidenav').width('200px');
      $('#openEditPane').toggle();
    } else {
      $('#mySidenav').width('10px');
      $('#openEditPane').toggle();
    }
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
