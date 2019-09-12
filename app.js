const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/database")();
require("./startup/routes")(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
