var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EquipmentSchema   = new Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('Equipment', EquipmentSchema, 'equipment');