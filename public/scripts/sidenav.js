$(() => {

  $('#mySidenav').click(() => {
    console.log($('#mySidenav').width());
    if ($('#mySidenav').width() === 10) {
      $('#mySidenav').width('300px');
    } else $('#mySidenav').width('10px');
  });
});
