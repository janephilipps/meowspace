var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CatSchema = new Schema({
    name: String,
    birthMonth: String,
    birthYear: String,
    type: String
});

mongoose.model('Cat', CatSchema);