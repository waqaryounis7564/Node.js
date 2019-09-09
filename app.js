const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

app.use(bodyParser.json());
app.use("/genres", genres);
app.use("/customer", customers);

mongoose
  .connect("mongodb://localhost/Movies", { useNewUrlParser: true })
  .then(c => console.log("connected successfully"))
  .catch(e => console.log("error"));

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
