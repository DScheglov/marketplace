'use strict';

const winston = require('winston');
const expressWinston = require('express-winston');

function getLogger(_module, isMiddleware) {

  let transports = [];

  transports.push(
    new winston.transports.Console({
      colorize: true,
      level: 'debug',
      label: _module.filename.split('/').slice(-2).join('/')
    })
  );

  if (!!isMiddleware) {
    return expressWinston.logger({transports : transports});
  }

  return  new (winston.Logger)({transports : transports});
}

module.exports = getLogger;
