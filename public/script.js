$(function() {

  var catsTemplate = _.template($('#cats-template').html());

  var $catsList = $('#cats-list');

  $.get("/api", function (data) {
    var cats = data;

    _.each(cats, function (cat, index) {
      var $cat = $(catsTemplate(cat));
      $cat.attr('data-index', index);
      $catsList.append($cat);
    });
  });

  var $createForm = $('#create-form');
  var $home = $('#home');

  $catsList.hide();
  $createForm.hide();

  $('#create').on('click', function (event) {
    $home.hide();
    $catsList.hide();
    $createForm.show();
  });

  $('#cats').on('click', function (event) {
    $home.hide();
    $createForm.hide();
    $catsList.show();
  });

  $('#home-nav').on('click', function (event) {
    $catsList.hide();
    $createForm.hide();
    $home.show();
  });
});