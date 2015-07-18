// Require node modules

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Conect to DB
mongoose.connect("mongodb://localhost/test");
require('./models/cat.js');
var Cat = mongoose.model('Cat');

var seedCats = function() {
  Cat.count({}, function (err, count) {
    console.log("Count is " + count);
    if (count > 0) {
      console.log("DB is already seeded!");
    } else {
      // seed DB
      console.log("DB needs to be seeded!");
      Cat.create([
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
         type: "orange tabby"}
      ], function (err, cats) {
        if (err) {
          console.log("Error seeding DB: " + err);
        } else {
          console.log("Meow!");
        }
      });
    }
  });
};

seedCats();

// Instantiate express app
var app = express();

// MIDDLEWARE

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static assets
app.use(express.static('public'));

// ROUTES

// app.get('/', function (req, res) {
//   Cat.find().exec(function (err, cats) {
//     res.send(cats);
//   })
// });

app.get('/api', function (req, res) {
  // res.json(cats);
  Cat.find().exec(function (err, cats) {
    res.json(cats);
  });
  // console.log("Meow!");
});

// app.get('/cats', function (req, res) {
//   res.send("Cats page!");
// });

// app.get('/cats/:id', function (req, res) {
//   res.send("Cat profile page!");
// });

// app.get('/cats/new', function (req, res) {
//   res.send("Create a cat profile!");
// });

// app.post('/cats', function (req, res) {
//   // post new cat data to MongoDB
// });

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Meowspace app listening at http://%s:%s', host, port);
});