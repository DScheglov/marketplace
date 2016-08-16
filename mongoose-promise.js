module.exports = exports = (mongoose)=>{
  mongoose.Promise = global.Promise
  return mongoose;
}
