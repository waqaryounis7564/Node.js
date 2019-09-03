const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Joi = require("joi");
const uniqid = require("uniqid");

app.use(bodyParser.json());

const genres = [];

app.get("/genres/all", (req, res) => {
  res.send(genres);
});

app.post("/genres", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400);
  let genre = { name: req.body.name, id: uniqid() };
  genres.push(genre);
  res.send(genre);
});

//app.put();
// app.delete();
let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
