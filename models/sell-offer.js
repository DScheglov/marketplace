'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dcf = require('../lib/dcf');

const OfferStatusEnum = ['blank', 'preplaced', 'placed', 'failed', 'canceled', 'succeeded'];

const SellOfferSchema = new Schema({
  trader: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  assetId: {type: String, required: true},
  cessionId: {type: String, required: false},
  assetClass: {type: String, required: true},
  bookValue: {type: Number, required: true},
  totalAssetBookValue: {type: Number, required: true},
  bookDate: {type: Date, required: true},
  minPriceRate: {type: Number, required: true},
  maxSharedAPR: {type: Number, required: true},
  dividable: {type: Boolean, 'default': true},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expared: {type: Date, required: true},
  updated: {type: Date, 'default': Date.now},
  relativeFlows: [{value: Number, date: Date}],
  cachedPrices: Schema.Types.Mixed,
  traders: [{type: Schema.Types.ObjectId, ref: 'Trader'}],
  pendingCommitments: [{type: Schema.Types.ObjectId, ref: 'Commitment'}]
});

SellOfferSchema.methods.getPrice = SellOffer__getPrice;
SellOfferSchema.methods.place = SellOffer__place;
SellOfferSchema.virtual('loanPartRatio')
  .get(SellOfferSchema__getLoanPartRatio);

const SellOffer = mongoose.model('SellOffer', SellOfferSchema);

module.exports = exports = {
  SellOffer: SellOffer
}

///////////////////////////////////////////////////////////////////////////////
// Implemetation
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


function SellOffer__place(callback) {
  let BuyOffer = mongoose.model('BuyOffer');
  let Commitment = mongoose.model('Commitment');
  let s = this;
  callback = arguments[arguments.length - 1];
  this.status = 'preplaced';
  return this.save()
    .then(()=>{
      var stream = BuyOffer.find({
        status: 'placed',
        assetClasses: this.assetClass,
        //expired: {$gt: Date.now},
        intermediaryAPR: {$lte: this.maxSharedAPR},
        trader: {$nin: this.traders.concat(this.trader)}
      }).sort('updated').stream();

      stream.on('data', (b)=>{
        stream.pause();
        Commitment.create(s, b, (err, c) => {
          if (err) return stream.resume();
          c.process((err)=>{
            stream.resume();
          });
        });
      });

      return stream.on('close', (err)=>{
        return callback(err, s);
      });

    });
}

function SellOfferSchema__getLoanPartRatio() {
  return this.bookValue / this.totalAssetBookValue;
}
