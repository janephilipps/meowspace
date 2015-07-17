$(function() {

  var catsTemplate = _.template($('#cats-template').html());

  var cats = [
    {name: "Rascal",
     birthMonth: "February",
     birthYear: "2012",
     type: "tabby"},
    {name: "GreyBear",
     birthMonth: "August",
     birthYear: "2014",
     type: "siamese"},
    {name: "Oliver",
     birthMonth: "November",
     birthYear: "2010",
     type: "orange tabby"},
  ];

  var $catsList = $('#cats-list');

  _.each(cats, function (cat, index) {
    var $cat = $(catsTemplate(cat));
    $cat.attr('data-index', index);
    $catsList.append($cat);
  });

});