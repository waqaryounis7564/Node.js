const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  try {
    let customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
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
