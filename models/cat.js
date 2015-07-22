var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var CatSchema = new Schema({
    email: String,
    passwordDigest: String,
    name: String,
    birthMonth: String,
    birthYear: String,
    type: String
});

// create a new cat with secure (hashed) password
CatSchema.statics.createSecure = function (email, password, name, birthMonth, birthYear, type, callback) {
  // `this` references our schema
  // store it in variable `that` because `this` changes context in nested callbacks
  var that = this;

  // hash password cat enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new cat (save to db) with hashed password
      that.create({
        email: email,
        passwordDigest: hash,
        name: name,
        birthMonth: birthMonth,
        birthYear: birthYear,
        type: type
      }, callback);
    });
  });
};

// authenticate cat (when cat logs in)
CatSchema.statics.authenticate = function (email, password, callback) {
  // find cat by email entered at log in
  this.findOne({email: email}, function (err, cat) {
    console.log(cat);

    // throw error if can't find cat
    if (cat === null) {
      throw new Error('Can\'t find cat with email ' + email);

    // if found cat, check if password is correct
    } else if (cat.checkPassword(password)) {
      callback(null, cat);
    }
  });
};

// compare password cat enters with hashed password (`passwordDigest`)
CatSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password cat enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

mongoose.model('Cat', CatSchema);