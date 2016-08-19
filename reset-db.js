const async = require('async');
const commandLineArgs = require('command-line-args')
const mongoose = require('./mongoose-promise')(require('mongoose'));
const models = require('./models');

const optionDefinitions = [
  { name: 'case', alias: 'c', type: String }
];

const options = commandLineArgs(optionDefinitions);

options.case = options.case || '20-20-1';

console.log('Using case: ' + options.case);

function initialize(callback) {
  callback = arguments[arguments.length-1];
  mongoose.connect('mongodb://localhost/p2p-marketplace', callback);
}

function fixtures(data, callback) {
  callback = arguments[arguments.length-1];
  return async.forEachOf(data, (rows, modelName, next) => {
    if (typeof rows === 'string') rows = require(rows);
    const model = mongoose.model(modelName);
    model.remove({}).then(()=>{
      console.log('All documents removed from ' + modelName);
      if (rows && rows.length) return model.collection.insert(rows);
    }).then(()=>model.count()).then(res=>{
      console.log(res + ' documents inserted into ' + modelName);
      next();
    }).catch(err=>{
      console.error('Error due model '+modelName+' processing: '+ err.message);
      return next()
    });
  }, callback);
}

function close(callback) {
  callback = arguments[arguments.length-1];
  mongoose.connection.close(callback);
}

async.waterfall([
  initialize,
  fixtures.bind(null, {
    Trader: require('./fixtures/' + options.case + '/traders'),
    BuyOffer: require('./fixtures/' + options.case + '/buy-offers'),
    SellOffer: require('./fixtures/' + options.case + '/sell-offers'),
    Commitment: []
  }),
  close
], function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('done.');
});
