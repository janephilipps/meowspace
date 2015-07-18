var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost/test");

// Instantiate express app
var app = express();

// MIDDLEWARE

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static assets
app.use(express.static('public'));

// TEST DATA
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

// ROUTES

app.get('/api', function (req, res) {
  res.json(cats);
  console.log("Meow!");
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