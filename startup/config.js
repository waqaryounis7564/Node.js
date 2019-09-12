module.exports = function() {
  if (!process.env.privateKey) {
    console.log("fatal error,please set privateKey");
    process.exit(1);
  }
};
