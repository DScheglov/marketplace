'use strict';
const merest = require('merest');
const models = require('../models');

const api = new merest.ModelAPIExpress();
api.expose(models.Trader);
api.expose(models.SellOffer, {expose: {
  place: 'get'
}});
api.expose(models.BuyOffer);
api.expose(models.Commitment);

module.exports = exports = api;
