// Require node modules

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    session = require('express-session');

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

// Set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves catId in session for logged-in cat
  req.login = function (cat) {
    req.session.catId = cat.id;
  };

  // finds cat currently logged in based on `session.catId`
  req.currentCat = function (callback) {
    Cat.findOne({_id: req.session.catId}, function (err, cat) {
      req.cat = cat;
      callback(null, cat);
    });
  };

  // destroy `session.catId` to log out user
  req.logout = function () {
    req.session.catId = null;
    req.cat = null;
  };

  next();
});

// ROUTES

app.get('/', function (req, res) {
  res.sendfile('views/index.html');
});

// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.send('coming soon');
});

// cat submits the signup form
app.post('/cats', function (req, res) {

  // grab cat data from params (req.body)
  var newCat = req.body;
  // console.log(newCat);
  // console.log(req.body);

  // create new cat with secure password
  Cat.createSecure(newCat.email, newCat.password, newCat.name, newCat.birthMonth, newCat.birthYear, newCat.type, function (err, cat) {
    if (err) {
      console.log("Error is " + err);
    } else {
      console.log(cat);
      res.redirect('/?login=true');
    }
  });
});

app.get('/login', function (req, res) {
  res.sendfile('views/index.html');
});

app.get('/logout', function (req, res) {
  req.logout();
});

// cat submits the login form
app.post('/login', function (req, res) {

  // grab cat data from params (req.body)
  var catData = req.body;

  // call authenticate function to check if password user entered is correct
  Cat.authenticate(catData.email, catData.password, function (err, cat) {
    // saves cat id to session
    req.login(cat);

    // redirect to cat profile
    res.redirect('/profile');
  });
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentCat(function (err, cat) {
    console.log(session.catId);
    res.sendfile('views/profile.html');
  });
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