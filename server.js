const mongoose = require('./mongoose-promise')(require('mongoose'));
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // to support HTTP OPTIONS
const api = require('./api');
const logger = require('./lib/logger');

mongoose.connect('mongodb://localhost/p2p-marketplace');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(logger(module, true));
const FRONT_END_PATH = __dirname + '/front-end';
console.log('Serving static in %s', FRONT_END_PATH);
app.use('/', express.static(FRONT_END_PATH, {index: 'index.html'})); // exposing front-end

app.use('/api/v1', api); // exposing our API

app.listen(1337, function(){
  console.log('Express server is listening on port 1337');
});
