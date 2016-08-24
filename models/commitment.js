'use strict';

const mongoose = require('mongoose');
const async = require('async');
const rounding = require('../rounding');
const promisify = require('../lib/promisify');
const $cb = require('../lib/callback');
const updated = required('./plugins/updated');

const Schema = mongoose.Schema;

const CommitmentStatusEnum = ['blank', 'pending', 'premade', 'made', 'canceling', 'executed', 'canceled', 'failed'];
const CommitmentSchema = new Schema({
  assetId: {type: String, required: true},
  cessionId: {type: String, required: false},
  sellOffer: {type: Schema.Types.ObjectId, ref: 'SellOffer', required: true},
  buyOffer: {type: Schema.Types.ObjectId, ref: 'BuyOffer', required: false},
  seller: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  buyer: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  bookValue: {type: Number, required: true, default: 0}, // the amount of asset book value to be sold/purhcased
  investment: {type: Number, required: true, default: 0}, // the amount of investment to be withdrawn from Buyers Account
  assetPrice: {type: Number, required: true, default: 0}, // the amount of assetPrice to be paid to Seller
  intermediaryMargin: {type: Number, required: true, default: 0}, // the amount of margin to be left for intermediary
  portfolioId: {type: String, required: true},
  status: {type: String, rquired: true, enum: CommitmentStatusEnum},
  statusDescription: String
});
CommitmentSchema.plugin(updated, {index: 1});

CommitmentSchema.statics.create = Commitment__static_create;
CommitmentSchema.methods.process = Commitment__process;

const Commitment = mongoose.model('Commitment', CommitmentSchema)

module.exports = exports = {
  Commitment: Commitment
}

const round = rounding.round;
const f_round = rounding.f_round;
const c_round = rounding.c_round;

// syncronious calculations only
function Commitment__static_create(sellOffer, buyOffer) {

  let s = sellOffer;
  let b = buyOffer;
  let c, e = null;

  if (s.bookValue === 0 || ['preplaced', 'placed'].indexOf(s.status) < 0) {
    throw new Error('The sell-offer is not eligible to make Commitments');
  }

  if (b.volume === 0 || ['preplaced', 'placed'].indexOf(b.status) < 0) {
    throw new Error('The buy-offer is not eligible to make Commitments');
  }

  let seller = s.trader && s.trader._id || s.trader;
  let buyer = b.trader && s.trader._id || b.trader;

  if (seller.toString() == buyer.toString()) {
    throw new Error('The commitment couldn\'t be made for the same trader');
  }

  let buyers = s.traders.map((t)=>(t._id||t).toString());
  if (buyers.indexOf(buyer.toString())>=0) {
    throw new Error('The asset couldn\'t be sold twice to the same trader');
  };

  // getting asset prices for intermediary and for investor
  let price = {
    toSell: s.getPrice(b.APR, 'annual'), // investors rate
    toBuy: s.getPrice(b.intermediaryAPR, 'annual') // investors rate + intermediary margin
  };

  c = new Commitment({
    sellOffer: s,
    buyOffer: b,
    seller: seller,
    buyer: buyer,
    assetId: s.assetId,
    cessionId: s.cessionId,
    portfolioId: b.portfolioId,
    status: 'blank'
  });

  // Identify case when we have to deal with whole asset
  let buyWholeAsset = !s.dividable || // if we can't to divide the asset
    (s.assetPartRatio === 1) && // if asset is whole AND
    (b.buyWholeAsset) // if buyer wants to buy whole loan
  ;

  if (buyWholeAsset) {
    c.bookValue = s.bookValue;
  } else {
    c.bookValue = f_round(b.maxInvestmentPerLoan / price.toSell);
    if (c.bookValue - s.bookValue > 0) c.bookValue = s.bookValue;
    let rest = s.bookValue - c.bookValue;
    if (rest > 0 && rest < s.minBookValue) {
      c.bookValue = s.bookValue - s.minBookValue;
    }
  }
  c.investment = c_round(c.bookValue * price.toSell);

  if (!b.buyWholeAsset && c.investment - b.maxInvestmentPerLoan > 0) {
    throw new Error('Whole asset purchase violates max investment per loan');
  };

  if (c.investment - b.volume > 0) {
    if (!s.dividable) {
      throw new Error('Not enough investment funds to buy asset');
    }
    c.investment = b.volume;
    c.bookValue = round(this.investment / price.toSell);
  }

  c.assetPrice = round(c.bookValue * price.toBuy);
  c.intermediaryMargin = round(c.investment - c.assetPrice);

  if (c.bookValue === 0 || c.investment === 0 || c.assetPrice === 0) {
    throw new Error('Couldn\'t create commitment for zero amounts')
  };

  return c;

};

function Commitment__process(callback) {

  let c = this;

  callback = arguments[arguments.length - 1];

  if (!callback || !(callback instanceof Function)) {
    return promisify(Commitment__process, this, arguments);
  }

  let actions = [];
  let populate = [];
  if (!c.sellOffer._id) populate.push('sellOffer');
  if (c.buyOffer && !c.buyOffer._id) populate.push('buyOffer');
  if (populate.length) actions.push(c.populate.bind(c, populate));

  c.status = 'made';
  c.updated = new Date();

  actions.push(function(){
    let next = $cb(arguments);
    let s = c.sellOffer;
    s.bookValue = s.bookValue - c.bookValue;
    s.traders.push(c.buyer);
    s.lastCommitmentDateTime = c.updated;
    return s.save(next);
  });

  let b = c.buyOffer || null;

  if (b) {
    actions.push(function() {
      let next = $cb(arguments);
      b.volume = b.volume - c.investment;
      b.lastCommitmentDateTime = c.updated;
      b.lockedBy = null;
      return b.save(next);
    });
  };

  actions.push(function() {
    let next = $cb(arguments);
    return c.save(next);
  });

  return async.waterfall(actions, function(err) {
    if (err) return callback(null);
    return callback(null, c);
  });

};
