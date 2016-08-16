
module.exports = exports = promisify;

function promisify(func, instance, args) {
  args = Array.prototype.slice.call(args);
  return new Promise((resolve, reject) => {
    args.push(function() {
      if (arguments.length && arguments[0] instanceof Error) {
        return reject.apply(null, arguments);
      }
      return resolve.apply(null, Array.prototype.slice.call(arguments, 1));
    });
    return func.apply(instance, args);
  });
}
