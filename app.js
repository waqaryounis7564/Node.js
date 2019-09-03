const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Joi = require("joi");
const uniqid = require("uniqid");

app.use(bodyParser.json());

const genres = [{ name: "animted", id: "5a" }];
//getting genre
app.get("/genres/all", (req, res) => {
  res.send(genres);
});
//posting genre
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
//editing genre
app.put("/genres/:id", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.status(404).send("invalid id");
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.send(error.details[0].message);
  genre.name = req.body.name;
  res.send(genre.name);
});
//deleting created genre
app.delete("/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.send("invalid id");
  genres.shift(genre);
  res.send(genre);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`listening to port ${port}...`);
});
