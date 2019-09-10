const mongoose = require("mongoose");
const { Genre, genreSchema } = require("../models/genre");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 50 },
  genre: { type: genreSchema, required: true },
  numberInStock: {
    type: Number,
    maxlength: 255,
    minlength: 0,
    required: true
  },
  dailyRentalRate: { type: Number, required: true }
});
const Movie = mongoose.model("movie", movieSchema);

function validate(body) {
  const schema = {
    title: Joi.string()
      .required()
      .min(3)
      .max(50),
    genre_id: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  };
  return Joi.validate(body, schema);
}

exports.Movie = Movie;
exports.validate = validate;
