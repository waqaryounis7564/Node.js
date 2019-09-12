const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost/Movies", { useNewUrlParser: true })
    .then(c => console.log("connected successfully"))
    .catch(e => console.log("error"));
};
