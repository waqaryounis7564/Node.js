const mongoose = require("mongoose");
const Joi = require("joi");

function validateCustomer(body) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    mobile: Joi.string()
      .required()
      .max(13)
  };
  return Joi.validate(body, schema);
}
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  mobile: { type: String, required: true, maxlength: 15 },
  isGold: { type: Boolean, default: false }
});
const Customer = mongoose.model("customer", customerSchema);

exports.Customer = Customer;
exports.validate = validateCustomer;
