var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TraderSchema = new Schema({
  title: {type: String, required: true},
  code: {type: String, required: true, unique: true}
});

var Trader = mongoose.model('Trader', TraderSchema);

module.exports = exports = {
  Trader: Trader
}
