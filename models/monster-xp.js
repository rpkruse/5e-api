var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MonsterXpSchema   = new Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('MonsterXP', MonsterXpSchema, 'monster-xp');