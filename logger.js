function log(req, res, next) {
  console.log("....continue");
  next();
}

module.exports = log;
