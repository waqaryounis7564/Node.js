const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const mongoose = require("mongoose");
const rental = require("./routes/rentals");

app.use(bodyParser.json());
app.use("/genres", genres);
app.use("/customer", customers);
app.use("/movies", movies);
app.use("/rental", rental);

mongoose
  .connect("mongodb://localhost/Movies", { useNewUrlParser: true })
  .then(c => console.log("connected successfully"))
  .catch(e => console.log("error"));

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
