$(function() {

  var catsTemplate = _.template($('#cats-template').html());

  var $catsList = $('#cats-list');

  _.each(cats, function (cat, index) {
    var $cat = $(catsTemplate(cat));
    $cat.attr('data-index', index);
    $catsList.append($cat);
  });

});