const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/all", async (req, res) => {
  let genres;
  try {
    genres = await Genre.find();
  } catch (error) {
    console.log(error);
  }
  res.send(genres);
});
//posting genre
router.post("/", auth, async (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  try {
    await genre.save();
  } catch (error) {
    console.log(error);
  }

  res.send(genre);
});
//editing genre
router.put("/:id", auth, async (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  const genre = await Genre.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { new: true }
  );
  if (!genre) return res.status(404).send("invalid id");
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  res.send(genre);
});
//deleting created genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findOneAndDelete({ _id: req.params.id });
  if (!genre) return res.send("invalid id");
  res.send(genre);
});

module.exports = router;
