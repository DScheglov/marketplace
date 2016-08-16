const mongoose = require('./mongoose-promise')(require('mongoose'));
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // to support HTTP OPTIONS
const api = require('./api');

mongoose.connect('mongodb://localhost/p2p-marketplace');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use('/api/v1', api); // exposing our API

app.listen(1337, function(){
  console.log('Express server is listening on port 1337');
});
