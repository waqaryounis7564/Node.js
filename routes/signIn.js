const express = require("express");
const router = express.Router();
const { SignUp } = require("../models/signup");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const registered = await SignUp.findOne({ email: req.body.email });
    if (!registered) return res.send("incorrect email or password");

    const validUser = await bcrypt.compare(
      req.body.password,
      registered.password
    );
    if (!validUser) return res.status(400).send("invalid user or password");
    const token = registered.Authentication();
    console.log(token);
    res.send("login successfully");
  } catch (error) {
    console.log(error.message);
  }
});

function validate(body) {
  const schema = {
    email: joi.string().required(),
    password: joi.string().required()
  };
  return joi.validate(body, schema);
}
module.exports = router;
