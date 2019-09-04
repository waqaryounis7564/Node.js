const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const Joi = require("joi");

const genres = [{ name: "animted", id: "5a" }];

router.get("/all", (req, res) => {
  res.send(genres);
});
//posting genre
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const genre = genres.find(g => g.id === req.params.id);
  if (!genre) return res.send("invalid id");
  genres.shift(genre);
  res.send(genre);
});

module.exports = router;