'use strict';

var mongoose = require('mongoose');
var Round = require('fin-rounds').Round;

// Creating rounding function with banker's algorithm and
// 2-digits after coma precision
var round = new Round('bank', 2);
var roundPercents = new Round('bank', 6);

var Schema = mongoose.Schema;

var OfferStatusEnum = ['blank', 'open', 'failed', 'canceled', 'succeeded'];

var SellOfferSchema = new Schema({
  assetID: {type: String, required: true},
  titleDocumentID: {type: String, required: true},
  assetClass: {type: String, required: true}
  bookValue: {type: Number, required: true},
  bookDate: {type: Date, required: true},
  minPriceRate: {type: Number, required: true},
  maxSharedAPR: {type: Number, required: true},
  loanPartRatio: {type: Number, required: true},
  dividable: {type: Boolean, 'default': true},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expared: {type: Date, required: true},
  updated: {type: Date, `default`: Date.now},
  relativeFlows: [{type: {value: Number, date: Date}, required: true}],
  cachedPrices: Schema.Types.Mixed
});

SellOfferSchema.methods.getPriceRates = function(rates) {
  let prices = {};
  var rateNames = Object.keys(rates);

  var dcf = discount(this.relativeFlows).on(this.bookDate);

  this.cachedPrices = this.cachedPrices || {};

  for (let rateName of rateNames) {
    let cacheName = roundPercents(rates[rateName] * 10000).toString();
    if (!this.cachedPrices[cacheName]) {
      this.cachedPrices[cacheName] = dcf.by(rates[rateName]);
    }
    prices[rateName] = this.cachedPrices[cacheName];
  }

};

var BuyOfferSchema = new Schema({
  assetClasses: {type: [String], required: true},
  volume: {type: Number, required: true},
  APR: {type: Number, required: true},
  intermediaryMarginRate: {type: Number, required: true},
  maxPriceRate: {type: Number, required: true},
  maxInvestmentPerLoan: Number,
  buyWholeAsset: {type: Boolean, 'default': false},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expared: {type: Date, required: true},
  updated: {type: Date, `default`: Date.now},
  assets: [String]
});

var CommitmentStatusEnum = ['blank', 'made', 'executed'];
var CommitmentSchema = new Schema({
  bookValue: {type: Number, required: true, default: 0}, // the amount of asset book value to be sold/purhcased
  investment: {type: Number, required: true, default: 0}, // the amount of investment to be withdrawn from Buyers Account
  assetPrice: {type: Numver, required: true, default: 0}, // the amount of assetPrice to be paid to Seller
  intermediaryMargin: {type: Number, required: true, default: 0}, // the amount of margin to be left for intermediary
  status: {type: String, rquired: true, enum: CommitmentStatusEnum}
});

CommitmentSchema.statics.create = function(sellOffer, buyOffer, callback) {
  let s = sellOffer;
  let b = buyOffer;
  let c = new Commitment({status: 'blank'});

  // getting asset prices for intermediary and for investor
  let price = s.getPriceRates({
    toSell: b.APR / 365, // investors rate
    toBuy: (b.APR + b.intermediaryMarginRate) / 365 // investors rate + intermediary margin
  });

  // Identify case when we have to deal with whole loan
  var buyWholeAsset =
    (s.loanPartRatio === 1) && // if asset is whole AND
    (b.buyWholeAsset) // if buyer whants to buy whole loan
  ;

  if (buyWholeAsset || !s.dividable) {
    c.bookValue = s.bookValue;
  } else {
    c.bookValue = round(b.maxInvestmentPerLoan / price.toSell);
    if (c.bookValue - s.bookValue > 0) c.bookValue = s.bookValue;
  }
  c.investment = round(c.bookValue * price.toSell);

  if (c.investment - b.volume > 0) {
    if (!s.dividable) {
      throw new Error('Not enough investment funds to buy asset');
    }
    c.investment = b.volume;
    c.bookValue = round(c.investment / price.toSell);
  }

  c.assetPrice = round(c.bookValue * price.toBuy);
  c.intermediaryMargin = round(c.investment - c.assetPrice);
  return c.save(callback);
};

var SellOffer = mongoose.model('SellOffer', SellOfferSchema);
var BuyOfferSchema = mongoose.model('BuyOffer', BuyOffeerSchema)

module.exports = exports = {
  Offer: Offer,
  OfferStatuses: OfferStatusEnum
}

function discount(flows) {
  return new DCF(flows);
};

function DCF(flows) {
  this.flows = flows;
  this.startFrom = null;
};

DCF.prototype.on = function(date) {
  this.startFrom = new Date(date);
  return this;
}

DCF.prototype.by = function (rate) {
  let d0 = this.startFrom || new Date();
  rate = parseFloat(rate) + 1;
  return this.flows.reduce((p, S) => S += p / Math.pow(rate, days(p.date, d0)), 0)
}


function days(date1, date2) {
  let ms = date1.valueOf();
  if (typeof(date2) !== 'undefined') {
    ms -= date2.valueOf();
  }
  return parseInt(ms / days.msPerDay, 10);
}
days.msPerDay = 1000 * 60 * 60 * 24;
