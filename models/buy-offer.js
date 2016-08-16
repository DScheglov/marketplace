'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OfferStatusEnum = ['blank', 'preplaced', 'placed', 'failed', 'canceled', 'succeeded'];

const BuyOfferSchema = new Schema({
  trader: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  portfolioId: {type: String, required: true},
  assetClasses: {type: [String], required: true},
  volume: {type: Number, required: true},
  APR: {type: Number, required: true},
  intermediaryAPR: {type: Number, required: true},
  maxPriceRate: {type: Number, required: true},
  maxInvestmentPerLoan: Number,
  buyWholeAsset: {type: Boolean, 'default': false},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expired: {type: Date, required: true},
  updated: {type: Date, 'default': Date.now},
  pendingCommitments: [{type: Schema.Types.ObjectId, ref: 'Commitment'}]
});

const BuyOffer = mongoose.model('BuyOffer', BuyOfferSchema);

module.exports = exports = {
  BuyOffer: BuyOffer
}
