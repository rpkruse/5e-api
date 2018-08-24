var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GodSchema   = new Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('God', GodSchema, 'gods');