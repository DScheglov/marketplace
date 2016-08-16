'use strict';

function SellOfferSoldError(message) {
  let err;
  if (message instanceof Error) err = message;
  else err = new Error(message);
  err.__proto__ = SellOfferSoldError.prototype;

  if (typeof message === 'string') {
    Object.defineProperty(err, 'message', {
      enumerable: true,
      value: message,
      writeable: false
    });
  }
  return err;
};

SellOfferSoldError.prototype = Object.create(Error.prototype);
SellOfferSoldError.prototype.constructor = SellOfferSoldError;
SellOfferSoldError.prototype.name = 'SellOfferSoldError';

function BuyOfferSoldError(message) {
  let err;
  if (message instanceof Error) err = message;
  else err = new Error(message);
  err.__proto__ = BuyOfferSoldError.prototype;

  if (typeof message === 'string') {
    Object.defineProperty(err, 'message', {
      enumerable: true,
      value: message,
      writeable: false
    });
  }
  return err;
};

BuyOfferSoldError.prototype = Object.create(Error.prototype);
BuyOfferSoldError.prototype.constructor = BuyOfferSoldError;
BuyOfferSoldError.prototype.name = 'BuyOfferSoldError';


module.exports = exports = {
  SellOfferSoldError: SellOfferSoldError
}
