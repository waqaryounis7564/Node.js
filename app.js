const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

app.use(bodyParser.json());
app.use("/genres", genres);
app.use("/customer", customers);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
