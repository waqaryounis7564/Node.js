const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const genres = require("./routes/genres");

app.use(bodyParser.json());
app.use("/genres", genres);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
