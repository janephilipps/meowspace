var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CatSchema = new Schema({
    emailAddress: String,
    password: String,
    name: String,
    birthMonth: String,
    birthYear: String,
    type: String
});

mongoose.model('Cat', CatSchema);