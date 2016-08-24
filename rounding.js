const Round = require('fin-rounds').Round;

const ACCURACY = 0;

module.exports = exports = {
  ACCURACY: ACCURACY,
  round: new Round('bank', ACCURACY),
  f_round: new Round('floor', ACCURACY),
  c_round: new Round('ceil', ACCURACY)
}
