const Joi = require("joi");
const mongoose = require("mongoose");

function validateGenre(body) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(body, schema);
}

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 }
});

const Genre = mongoose.model("genre", genreSchema);

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
