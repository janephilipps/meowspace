$(function() {

  // var catsTemplate = _.template($('#cats-template').html());

  // var $catsList = $('#cats-list');

  // $.get("/api", function (data) {
  //   var cats = data;

  //   _.each(cats, function (cat, index) {
  //     var $cat = $(catsTemplate(cat));
  //     $cat.attr('data-index', index);
  //     $catsList.append($cat);
  //   });
  // });

  // console.log($.url().param('login'));

  var $url = window.location.href;
  console.log($url);

  // if URL contains "login=true" string
  if ($url.indexOf("login=true") > -1) {
    // show login modal
    $('.login').modal('show')
  }

});