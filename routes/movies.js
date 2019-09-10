const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("/:id", async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
    return res.send("insert valid format id");
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.send("invalid id").status(400);
    res.send(movie);
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    if (!req.body.genre_id.match(/^[0-9a-fA-F]{24}$/)) {
      res.send("send valid id");
    }
    const genre = await Genre.findById(req.body.genre_id);
    if (!genre) res.status(400).send("invalid id");

    const movie = await new Movie({
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error.message);
  }
});
router.put("/:id", async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
    return res.send("insert valid format id");
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(400).send("movie not found");
    movie.title = req.body.title;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    if (req.body.genre_id) {
      const genre = await Genre.findById(req.body.genre_id);
      if (!genre) return res.send("genre id is invalid");
      movie.genre.name = req.body.genre_name;
      await genre.save();
    }
    await movie.save();

    res.send(movie);
  } catch (error) {
    console.log(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
    return res.send("insert valid format id");

  try {
    const movie = await Movie.findByIdAndRemove({ _id: req.params.id });
    if (!movie) return res.status(400).send("movie not found");
    res.send(movie);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
