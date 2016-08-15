'use strict';

const mongoose = require('mongoose');
const async = require('async');
const Round = require('fin-rounds').Round;

const Schema = mongoose.Schema;

const CommitmentStatusEnum = ['blank', 'pending', 'premade', 'made', 'canceling', 'executed', 'canceled', 'failed'];
const CommitmentSchema = new Schema({
  sellOffer: {type: Schema.Types.ObjectId, ref: 'SellOffer', required: true},
  buyOffer: {type: Schema.Types.ObjectId, ref: 'BuyOffer', required: false},
  seller: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  buyer: {type: Schema.Types.ObjectId, ref: 'Trader', required: true},
  bookValue: {type: Number, required: true, default: 0}, // the amount of asset book value to be sold/purhcased
  investment: {type: Number, required: true, default: 0}, // the amount of investment to be withdrawn from Buyers Account
  assetPrice: {type: Number, required: true, default: 0}, // the amount of assetPrice to be paid to Seller
  intermediaryMargin: {type: Number, required: true, default: 0}, // the amount of margin to be left for intermediary
  status: {type: String, rquired: true, enum: CommitmentStatusEnum},
  statusDescription: String,
  updated: {type: Date, required: true, 'default': Date.now}
});

CommitmentSchema.statics.create = Commitment__static_create;
CommitmentSchema.methods.process = Commitment__process;

const Commitment = mongoose.model('Commitment', CommitmentSchema)

module.exports = exports = {
  Commitment: Commitment
}


// Creating rounding function with banker's algorithm and
// 2-digits after coma precision
const round = new Round('bank', 2);

function Commitment__static_create(sellOffer, buyOffer, callback) {
  let s = sellOffer;
  let b = buyOffer;
  let c = new Commitment({
    sellOffer: s,
    buyOffer: b,
    seller: s.trader,
    buyer: b.trader,
    status: 'blank'
  });

  // getting asset prices for intermediary and for investor
  let price = {
    toSell: s.getPrice(b.APR, 'annual'), // investors rate
    toBuy: s.getPrice(b.intermediaryAPR, 'annual') // investors rate + intermediary margin
  };

  // Identify case when we have to deal with whole asset
  let buyWholeAsset = !s.dividable || // if we can't to divide the asset
    (s.loanPartRatio === 1) && // if asset is whole AND
    (b.buyWholeAsset) // if buyer wants to buy whole loan
  ;

  try {
    if (buyWholeAsset) {
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
      c.bookValue = round(this.investment / price.toSell);
    }

    c.assetPrice = round(c.bookValue * price.toBuy);
    c.intermediaryMargin = round(c.investment - c.assetPrice);

  } catch(err) {
    return callback(err, null);
  };

  if (s.isModified('cachedPrices')) {
    return s.save()
      .then(()=>c.save())
      .then(()=>callback(null, c))
      .catch(callback);
  }

  return c.save(callback);

};

function Commitment__process(callback) {

  let c = this;

  callback = arguments[arguments.length - 1];

  switch (this.status) {
    case "blank":  return c_start();
    case "pending": return c_apply();
    case "premade":  return c_push();
    case "canceling": return c_rollback();
  };

  return callback(new Error('Commitment status doesn\' allow to process it.'));

  function c_start() {
    c.status = "pending";
    c.updated = new Date();
    c.save(function(err, obj) {
      if (err) return c_fail(err);
      return c_apply();
    });
  };

  function c_apply() {
    if (c.status != 'pending') return;

    let actions = [updateSellOffer.bind(c)];
    if (c.buyOffer) actions.push(updateBuyOffer.bind(c));
    actions.push(markPremade.bind(c));

    async.waterfall(actions, (err) => {
      if (err) return c_rollback(err);
      c_push();
    });
  };

  function c_push() {
    if (c.status != 'premade') return;

    let actions = [releaseSellOffer.bind(c)];
    if (c.buyOffer) actions.push(releaseBuyOffer.bind(c));
    actions.push(markMade.bind(c));

    async.waterfall(actions, function (err) {
        if (err) return callback(err, c);
        callback(null, c);
      }
    );
  };

  function c_rollback(err) {
    let rollback_err = err;

    let actions = [markCanceling.bind(c), rollbackSellOffer.bind(c)];
    if (c.buyOffer) actions.push(rollbackBuyOffer.bind(c));

    async.waterfall(actions, (err) => {
      if (err) return callback(err, c);
      return c_fail(rollback_err);
    });
  }

  function c_fail(err) {
    let fail_err = err;
    if (err) this.statusDescription = err.message;
    c.status = "failed";
    c.updated = new Date();
    return c.save(function(err) {
      if (err) return callback(err, c);
      callback(fail_err || new Error("Commitment failed"), c);
    });
  };

};

function updateSellOffer(next) {
  mongoose.model('SellOffer').findOneAndUpdate({
    _id: this.sellOffer,
    traders: {$ne: this.buyer},
    pendingCommitments: {$ne: this._id},
    status: {$in: ['preplaced', 'placed']}
  }, {
    $inc: {bookValue: -this.bookValue},
    $push: {
      pendingCommitments: this._id,
      traders: this.buyer
    },
  }, {new: 1}, function (err, s) {
    if (err) return next(err);
    if (!s) return next(
      new Error('Sell-Offer status doesn\'t allow to process commitments')
    );
    if (s.bookValue < 0) return next(
      new Error('Asset was sold before this commitment')
    );
    next();
  });
};

function updateBuyOffer(next) {
  mongoose.model('BuyOffer').findOneAndUpdate({
    _id: this.buyOffer,
    pendingCommitments: {$ne: this._id},
    status: {$in: ['preplaced', 'placed']}
  }, {
    $inc: {volume: -this.investment},
    $push: {pendingCommitments: this._id}
  }, {new: 1}, function(err, b) {
    if (err) return next(err);
    if (!b) return next(
      new Error('Buy-Offer status doesn\'t allow to process commitments')
    );
    if (b.volume < 0) return next(
      new Error('Buy-offer was sexecuted before commitment')
    );
    next();
  })
};

function markPremade(next) {
  this.status = 'premade';
  this.updated = new Date();
  this.save(_do(next));
};

function releaseSellOffer(next) {
  mongoose.model('SellOffer').findOneAndUpdate({
    _id: this.sellOffer,
    pendingCommitments: this._id
  },{
    $pull: {pendingCommitments: this._id},
    $set: {updated: new Date()}
  }, _do(next));
};

function releaseBuyOffer(next) {
  mongoose.model('BuyOffer').findOneAndUpdate({
    _id: this.buyOffer,
    pendingCommitments: this._id
  },{
    $pull: {pendingCommitments: this._id},
    $set: {updated: new Date()}
  }, _do(next));
};

function markMade(next) {
  this.status = 'made';
  this.updated = new Date();
  return this.save(_do(next));
};

function markCanceling(next) {
  this.status = "canceling";
  this.lastModified = new Date();
  this.save(_do(next));
};

function rollbackSellOffer(next) {
  mongoose.model('SellOffer').update({
    _id: this.sellOffer,
    traders: this.buyer,
    pendingCommitments: this._id
  }, {
    $inc: {bookValue: this.bookValue},
    $pull: {
      pendingCommitments: this._id,
      traders: this.buyer
    }
  }, _do(next));
};

function rollbackBuyOffer(next) {
  mongoose.model('BuyOffer').update({
    _id: this.buyOffer,
    pendingCommitments: this._id
  }, {
    $inc: {volume: this.investment},
    $pull: {pendingCommitments: this._id}
  }, _do(next));
};

function _do(next) {
  return function(err, obj) {
    return next(err);
  };
}
