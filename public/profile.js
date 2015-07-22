$(function() {

  var profileTemplate = _.template($('#profile-template').html());

  var $profile = $('#profile');

  $.get("/api/cat", function (data) {
    var cat = data;

    _.each(cats, function (cat, index) {
      var $cat = $(profileTemplate(cat));
      $cat.attr('data-index', index);
      $profile.append($cat);
    });

  });

});