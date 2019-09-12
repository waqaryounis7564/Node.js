const bodyParser = require("body-parser");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rental = require("../routes/rentals");
const signup = require("../routes/signups");
const signin = require("../routes/signIn");

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use("/genres", genres);
  app.use("/customer", customers);
  app.use("/movies", movies);
  app.use("/rental", rental);
  app.use("/signup", signup);
  app.use("/signin", signin);
};
