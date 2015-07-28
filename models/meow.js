// Require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define meow schema
var MeowSchema = new Schema({
  title: String,
  content: String
});

// Create and export Meow model
var Meow = mongoose.model('Meow', MeowSchema);
module.exports = Meow;