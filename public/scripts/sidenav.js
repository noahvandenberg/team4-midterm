$(() => {

  $('#mySidenav').click(() => {
    if ($('#mySidenav').width() === 10) {
      console.log(document.cookie);
      $.get('/maps/8', (maps, status) => console.log(status, maps));
      $('#mySidenav').width('300px');
    } else $('#mySidenav').width('10px');
  });
});
