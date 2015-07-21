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

app.get('/', function (req, res) {
  res.sendfile('views/index.html');
});

// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.send('coming soon');
});

app.get('/api', function (req, res) {
  Cat.find().exec(function (err, cats) {
    res.json(cats);
  });
});

app.get('/create', function (req, res) {
  res.sendfile('views/create.html');
});

app.get('/cats', function (req, res) {
  res.sendfile('views/cats.html');
});

app.post('/', function (req, res) {
  Cat.create({ name: req.body.name, birthMonth: req.body.birthMonth, birthYear: req.body.birthYear, type: req.body.type });
  console.log("Cat successfully created!")
  res.redirect('/');
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Meowspace app listening at http://%s:%s', host, port);
});