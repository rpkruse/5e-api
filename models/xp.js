var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var XpSchema   = new Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('XP', XpSchema, 'xp');