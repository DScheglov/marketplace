'use strict';

const mongoose = require('./mongoose-promise')(require('mongoose'));
const models = require('./models');

mongoose.connect('localhost', 'p2p-marketplace');

let Q = models.BuyOffer.find({
  "expired": {$gt: '2016-08-18'}
});

//Q = models.SellOffer.where('updated').lt(new Date());

Q.count()
  .then(res=>JSON.stringify(res, null, '  '))
  .then(res=>{
    console.log(res);
    mongoose.connection.close();
  })
  .catch(err=>{
    console.dir(err);
    mongoose.connection.close();
  });
