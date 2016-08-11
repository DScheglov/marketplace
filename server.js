var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // to support HTTP OPTIONS
var api = require('./api');

mongoose.connect('mongodb://localhost/p2p-marketplace');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use('/api/v1', api); // exposing our API

app.listen(1337, function(){
  console.log('Express server is listening on port 1337');
});
