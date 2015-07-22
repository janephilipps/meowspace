$(function() {

  var $url = window.location.href;
  console.log($url);

  // if URL contains "login=true" string
  if ($url.indexOf("login=true") > -1) {
    // show login modal
    $('.login').modal('show')
  }

});