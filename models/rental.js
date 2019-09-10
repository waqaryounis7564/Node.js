const mongoose = require("mongoose");
const joi = require("joi");

function validate(body) {
  const schema = {
    customer_id: joi.string().required(),
    movie_id: joi.string().required()
  };
  return joi.validate(body, schema);
}
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true },
      isGold: { type: Boolean, default: false }
    })
  },
  movie: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 255, required: true },
      dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
    })
  },
  rentalFee: { type: Number, min: 0 },
  dateOut: { type: Date },
  dateReturn: { type: Date }
});

const Rental = mongoose.model("rental", rentalSchema);

module.exports.Rental = Rental;
module.exports.validate = validate;
