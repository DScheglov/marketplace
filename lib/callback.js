'use strict';

module.exports = exports = ensureCallback;

function ensureCallback(args, required) {
  required = required || false;
  let n = args.length - 1;
  while (n>=0 && !(args[n] instanceof Function)) n--;
  if (n>=0) return args[n];
  if (required) throw new Error('Callback required');
  return ;
}
