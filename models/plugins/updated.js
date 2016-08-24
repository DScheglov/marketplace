
module.exports = exports = updatedPlugin;

function updatedPlugin(schema, options) {
  schema.add({
    updated: Date
  });
  schema.pre('validate', function(next) {
    if (this.isModified()) this.updated = new Date();
    return next();
  });
  if (options && options.index) schema.index({
    updated: options.index
  })
}
