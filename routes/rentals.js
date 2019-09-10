const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental, validate } = require("../models/rental");
const mongoose = require("mongoose");
const fawn = require("fawn");

fawn.init(mongoose);
const task = fawn.Task();

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.send(rentals);
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message).status(400);

    const movie = await Movie.findById(req.body.movie_id);
    if (!movie) return res.send("movie not found").status(404);
    if (movie.numberInStock === 0) return res.send("movies are not available");

    const customer = await Customer.findById(req.body.customer_id);
    if (!customer) return res.send("customer not found").status(404);

    let rental = new Rental({
      customer: { _id: customer._id, name: customer.name },
      movie: {
        _id: movie._id,
        name: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      },
      dateOut: Date.now(),
      dateReturn: Date.now()
    });
    task
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run()
      .then(() => res.send(rental))
      .catch(() => res.status(500));
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
