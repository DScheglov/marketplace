'use strict';

require('schema-emit-async');
const async = require('async');
const assert = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dcf = require('../lib/dcf');
const promisify = require('../lib/promisify');
const $cb = require('../lib/callback');
const updated = require('./plugins/updated');

const OfferStatusEnum = ['blank', 'preplaced', 'placed', 'failed', 'canceled', 'closed'];

//TODO: Replace with assigning from configuration
const MIN_BOOK_VALUE_TO_BE_SOLD = 500;

const SellOfferSchema = new Schema({
  trader: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  assetId: {type: String, required: true},
  cessionId: {type: String, required: false},
  assetClass: {type: String, required: true},
  bookValue: {type: Number, required: true},
  totalAssetBookValue: {type: Number, required: true},
  minBookValue: {type: Number, required: true, default: MIN_BOOK_VALUE_TO_BE_SOLD},
  bookDate: {type: Date, required: true},
  minPriceRate: {type: Number, required: true},
  maxSharedAPR: {type: Number, required: true},
  dividable: {type: Boolean, 'default': true},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expired: {type: Date, required: true},
  lastCommitmentDateTime: {type: Date, 'default': Date.now},
  relativeFlows: [{value: Number, date: Date}],
  cachedPrices: Schema.Types.Mixed,
  traders: [{type: Schema.Types.ObjectId, ref: 'Trader'}],
  pendingCommitments: [{type: Schema.Types.ObjectId, ref: 'Commitment'}]
});
SellOfferSchema.plugin(updated, {index: 1});

SellOfferSchema.index('assetClass');
SellOfferSchema.index({'status': 1, 'expired': 1});
SellOfferSchema.index('traders');
SellOfferSchema.index('pendingCommitments');

SellOfferSchema.methods.getPrice = SellOffer__getPrice;
SellOfferSchema.methods.place = SellOffer__place;
SellOfferSchema.virtual('assetPartRatio')
  .get(SellOfferSchema__getAssetPartRatio);

SellOfferSchema.when('placement', SellOffer__onPlacement);
SellOfferSchema.pre('validate', SellOfferSchema__preValidate);

const SellOffer = mongoose.model('SellOffer', SellOfferSchema);

module.exports = exports = {
  SellOffer: SellOffer
}

///////////////////////////////////////////////////////////////////////////////
// Implementation
//

const days = dcf.days;

function SellOffer__getPrice(rate, rateType) {

  let rates = normalizeRate(rate, rateType);
  let r = rates.r + 1;
  rate = rates.rate;

  let d0 = this.bookDate || new Date();
  let cacheName = 'r' + Math.round(rate * 10000000000);
  this.cachedPrices = this.cachedPrices || {};
  let res = this.cachedPrices[cacheName];

  if (typeof(res) === 'undefined') {
    res = this.relativeFlows.reduce(
      (S, p) => S + p.value / Math.pow(r, days(p.date, d0)),
      0
    );
    this.set('cachedPrices.' + cacheName, res);
  }

  return res;

};

function normalizeRate(rate, rateType) {
  rateType = rateType || 'annual'; // monthly | daily
  let r;

  switch (rateType) {
    case 'monthly': r = rate / 30.4; rate *= 12; break;
    case 'daily': r = rate; rate *= 365; break;
    case 'annual':
    default:
      r = rate / 365;
  }

  return {
    rate: rate, // annual
    r: r // daily
  }
}

/**
 * SellOffer__place - description
 *
 * @memberof SellOffer
 * @param  {type} callback description
 * @return {type}          description
 */
function SellOffer__place(callback) {
  callback = arguments[arguments.length - 1];
  if (!callback || !(callback instanceof Function)) {
    return promisify(SellOffer__place, this, arguments);
  };

  let s = this;
  try {
    assert.notEqual(s.status, 'closed');
    assert.ok(s.bookValue > 0);
  } catch(err) {
    return callback(
      new Error('Status of SellOffer doesn\'t allow to place it on marketplace')
    );
  };

  this.emitAsync('placement', this, onEnd);

  function onEnd(err, updated) {
    if (err) {
      releaseLockedOffers();
      return callback(err);
    }
    if (updated && updated.length && updated[0]) {
      return updated[0].emitAsync('placement', updated[0], onEnd);
    }

    releaseLockedOffers()

    if (s.status === 'preplaced') {
      s.status = 'placed';
      s.updated = new Date();
      return s.save(callback);
    }

    return callback(null, s);
  }

  function releaseLockedOffers() {
    mongoose.model('BuyOffer').update({
      lockedBy: s._id
    }, {
      $set: {lockedBy: null}
    },
    {multi: true}, ()=>{}); // we will not be waiting till this update happened
  }

}

/**
 * SellOffer__onPlacement - trys to find eligible BuyOffer and to
 * make commitment
 *
 * @memberof SellOffer__onPlacement
 * @event  `placement`
 * @param  {Function} callback
 */
function SellOffer__onPlacement(callback) {
  let BuyOffer = mongoose.model('BuyOffer');
  let Commitment = mongoose.model('Commitment');
  let s = this, commitment;

  let q = { // Preparing serach criteria
    status: 'placed',
    assetClasses: s.assetClass,
    expired: {$gt: new Date()},
    intermediaryAPR: {$lte: s.maxSharedAPR},
    trader: {$nin: s.traders.concat(s.trader)},
    lockedBy: null
  };

  // if the Asset is not dividable and it is still whole
  // we should find Buy-Offers that buys whole loans only
  if (!s.dividable && s.assetPartRatio === 1) {
    q.buyWholeAsset = true;
  };

  this.status = 'preplaced';
  this.updated = new Date();
  return BuyOffer.findOneAndUpdate(q, {
    $set: {
      lockedBy: s._id
    }
  }, {new: 1}).sort('lastCommitmentDateTime').exec(
    function (err, b) {
      if (err) {
        console.dir(err);
        return callback(err);
      };
      if (!b) return callback(null, null);
      let c;
      try {
        c = Commitment.create(s, b);
      } catch(e) {
        console.dir(e);
        return callback(null, s);
      }
      c.process(function(err, c) {
        if (err) console.dir(err);
        if (c) console.log(
          "%s: %s <=> %s: inv: $%d; aP: %d; bV: %d; mrg: %d; s.bV: %d; -- %s",
          c._id, c.sellOffer.assetId, c.buyOffer.portfolioId,
          c.investment, c.assetPrice, c.bookValue,
          c.intermediaryMargin, s.bookValue,
          c.status
        );
        if (s.bookValue === 0 || s.status === 'closed') {
          return callback(null, null);
        }
        return callback(null, s);
      });
    }
  );

}

function SellOfferSchema__getAssetPartRatio() {
  return this.bookValue / this.totalAssetBookValue;
}

function SellOfferSchema__preValidate(next) {
  let s = this;

  let isCommitmentAllowed = (
    ['preplaced', 'placed'].indexOf(s.status) >= 0
  );

  if (s.isModified('bookValue') && !isCommitmentAllowed) {
    return next(
      new Error('The status of the Sell Offers doesn\'t allow to make commitments')
    );
  };

  if (s.bookValue === 0 && s.status !== 'closed') {
    s.status = 'closed';
  };

  next();
};
