const express = require("express");
const router = express.Router();
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

router.get("/", async (req, res) => {
  try {
    let customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  let { error } = validateCustomer(req.body);
  if (error) return res.status(400).send("invalid data");

  try {
    let customer = await new Customer({
      name: req.body.name,
      mobile: req.body.mobile
    });
    await customer.save();
    res.send(customer);
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, iconst customer = await Customer.findById({ _id: req.params.id });
    const customer = await Customer.findById({ _id: req.params.id });
    if (!customer) return res.status(400).send("invalid id");
    if (!customer) return res.status(400).send("invalid id");
    res.send(customer);
  }

  res.send("invalid id");
});
router.put("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send("invalid data");
    try {
      const customer = await Customer.findByIdAndUpdate(
        { _id: req.params.id },
        { name: req.body.name, mobile: req.body.mobile },
        { new: true }
      );
      res.send(customer);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const customer = await Customer.findByIdAndDelete({ _id: req.params.id });
      if (!customer) return res.status(400).send("invalid id");
      res.send(customer);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
