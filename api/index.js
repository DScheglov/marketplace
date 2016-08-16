'use strict';
const merest = require('merest');
const models = require('../models');

const api = new merest.ModelAPIExpress();
api.expose(models.Trader);
api.expose(models.SellOffer, {
  expose: {place: 'get'},
  populate: "trader traders"
});
api.expose(models.BuyOffer, {
  populate: "trader"
});
api.expose(models.Commitment, {
  populate: "seller buyer"
});

module.exports = exports = api;
