var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Instantiate express app
var app = express();

// MIDDLEWARE

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static assets
app.use(express.static('public'));


// ROUTES
app.get('/', function (req, res) {
  console.log("Meow!");
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});