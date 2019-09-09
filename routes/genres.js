const express = require("express");
const router = express.Router();

const Joi = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Movies", { useNewUrlParser: true })
  .then(c => console.log("connected successfully"))
  .catch(e => console.log("error"));
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 }
});

const Genre = mongoose.model("genre", genreSchema);

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
router.post("/", async (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400);
  let genre = new Genre({ name: req.body.name });
  try {
    await genre.save();
  } catch (error) {
    console.log(error);
  }

  res.send(genre);
});
//editing genre
router.put("/:id", async (req, res) => {
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
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.send(error.details[0].message);

  res.send(genre);
});
//deleting created genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findOneAndDelete({ _id: req.params.id });
  if (!genre) return res.send("invalid id");
  res.send(genre);
});

module.exports = router;
