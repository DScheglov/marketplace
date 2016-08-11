var mongoose = require('mongoose');
var AssetSchema = require('./assets').AssetSchema;

var Schema = mongoose.Schema;

var OfferStatusEnum = ['blank', 'open', 'failed', 'canceled', 'succeeded'];

var SellOfferSchema = new Schema({
  assetID: {type: String, required: true},
  titleDocumentID: {type: String, required: true},
  assetClass: {type: String, required: true}
  bookValue: {type: Number, required: true},
  minPriceRate: {type: Number, required: true},
  maxSharedAPR: {type: Number, required: true},
  loanPartRatio: {type: Number, required: true},
  devidable: {type: Boolean, 'default': true},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expared: {type: Date, required: true},
  updated: {type: Date, `default`: Date.now},
  relativeFlows: [{type: {value: Number, date: Date}, required: true}]
});


var BuyOfferSchema = new Schema({
  assetClasses: {type: [String], required: true},
  volume: {type: Number, required: true},
  APR: {type: Number, required: true},
  intermediaryMarginRate: {type: Number, required: true},
  maxPriceRate: {type: Number, required: true},
  maxInvestmentPerLoan: Number,
  buyWholeLoan: {type: Boolean, 'default': false},
  status: {type: String, enum: OfferStatusEnum, required: true},
  expared: {type: Date, required: true},
  updated: {type: Date, `default`: Date.now},
  assets: [String]
});

var CommitmentStatusEnum = ['blank', 'made', 'executed'];
var CommitmentSchema = new Schema({
  bookValue: {type: Number, required: true}, // the amount of asset book value to be sold/purhcased
  investment: {type: Number, required: true}, // the amount of investment to be withdrawn from Buyers Account
  assetPrice: {type: Numver, required: true}, // the amount of assetPrice to be paid to Seller
  intermediaryMargin: {type: Number, required: true}, // the amount of margin to be left for intermediary
  status: {type: String, rquired: true, enum: CommitmentStatusEnum}
});

CommitmentSchema.statics.create = function(sellOffer, buyOffer, callback) {
  var s = sellOffer;
  var b = buyOffer;
  var c = new Commitment({status: 'blank'});

  // Identify case when we have to deal with whole loan
  var buyWholeLoan = (
    (s.loanPartRatio === 1) && // if asset is whole
    (b.buyWholeLoan || // if buyer whants to buy whole loan
     b.maxInvestmentPerLoan >= s.bookValue * b.maxPriceRate // or maxInvestmentPerLoan is enough to guy whole loan
    )
  );

  var priceRates = discount(s.relativeFlows).by({
    apr: b.APR,
    imr: b.APR + b.intermediaryMarginRate
  });

  if (buyWholeLoan) {
    c.bookValue = s.bookValue;
    c.investment = c.bookValue * priceRates
    c.assetPrice = c.bookValue * s.relateiveFlows.discountBy
  } else {

  }

  return c;
};

var SellOffer = mongoose.model('SellOffer', SellOfferSchema);
var BuyOfferSchema = mongoose.model('BuyOffer', BuyOffeerSchema)

module.exports = exports = {
  Offer: Offer,
  OfferStatuses: OfferStatusEnum
}

function discount(flows) {

};

function DCF(flows) {
  this.flows = flows;
};

DCF.prototype.by = function (rates, d0) {
  d0 = d0 || Date.now();
  if (typeof(rates) === 'number') {
    rates = {$: rates}
  };
  const rs = Object.keys(rates);
  const results = rs.reduce((rateName, res) => {
    res[rateName] = 0;
    return res;
  }, {});

  for (let flow of this.flows) {
    let pwIndex = (flow.date.valueOf() - d0) / 365;
    for (let dr of rs) {
      results[dr] += flow.value / Math.pow(1 + rates[dr], pwIndex)
    }
  };

  if (rs.length === 1 && typeof(results.$) !== 'undefined') {
    return results.$;
  }

  return results;

}
