'use strict';
const mongoose = require('mongoose');
const updated = require('./plugins/updated');

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
  lastCommitmentDateTime: {type: Date, 'default': Date.now},
  pendingCommitments: [{type: Schema.Types.ObjectId, ref: 'Commitment'}],
  lockedBy: {type: Schema.Types.ObjectId, ref: 'SellOffer', 'default': null}
});
BuyOfferSchema.plugins(updated, {index: 1});

BuyOfferSchema.index('trader');
BuyOfferSchema.index('assetClasses');
BuyOfferSchema.index('intermediaryAPR');
BuyOfferSchema.index({'status': 1, 'expired': 1});
BuyOfferSchema.index('updated');
BuyOfferSchema.index('pendingCommitments');
BuyOfferSchema.index('buyWholeAsset');
BuyOfferSchema.index('lockedBy');
BuyOfferSchema.index('lastCommitmentDateTime');

const BuyOffer = mongoose.model('BuyOffer', BuyOfferSchema);

module.exports = exports = {
  BuyOffer: BuyOffer
}
