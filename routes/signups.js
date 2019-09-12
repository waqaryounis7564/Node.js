const express = require("express");
const router = express.Router();
const { SignUp, validate } = require("../models/signup");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await SignUp.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message).status(400);
  try {
    const registeredUser = await SignUp.findOne({ email: req.body.email });
    if (registeredUser) return res.send("user already exist");

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const user = await new SignUp({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashed
    });
    await user.save();
    const token = user.Authentication();
    res.header("x-auth-token", token).send(user);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
