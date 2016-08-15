'use strict';

module.exports = exports = {
  DCF: DCF,
  discount: discount,
  days: days
}

function DCF(flows) {
  this.flows = flows;
  this.startFrom = null;
};

DCF.prototype.on = DCF__on;
DCF.prototype.by = DCF__by;

function discount(flows) {
  return new DCF(flows);
};

function DCF__on(date) {
  this.startFrom = new Date(date);
  return this;
};

function DCF__by(rate) {
  let d0 = this.startFrom || new Date();
  rate = parseFloat(rate) + 1;
  return this.flows.reduce((p, S) => S += p / Math.pow(rate, days(p.date, d0)), 0)
};

function days(date1, date2) {
  let ms = date1.valueOf();
  if (typeof(date2) !== 'undefined') {
    ms -= date2.valueOf();
  }
  return parseInt(ms / days.msPerDay, 10);
}
days.msPerDay = 1000 * 60 * 60 * 24;
