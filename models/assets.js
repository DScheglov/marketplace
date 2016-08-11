var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssetStatusEnum = ['current', 'late'];
var AssetSchema = new Schema({
  servicer: String,
  originator: String,
  riskGrade: {type: String, required: true},
  country: {type: String, required: true},
  currency: {type: String, required: true},
  assetType: {type: String, required: true},
  amount: {type: Number, required: true},
  status: {type: String, required: true, enum: AssetStatusEnum},
  bookValue: {type: Number, required: true},
  issued: {type: Date, required: true},
  closingDate: {type: Date, required: true},
  lastDueDate: Date,
  nextDueDate: Date,
  latency: Number,
  extensions: Number,
  maxExtensions: Number,
  flow: [Number],
  APR: Number
});

module.exports = exports = {
  AssetSchema: AssetSchema,
  AssetStatuses: AssetStatusEnum
}
