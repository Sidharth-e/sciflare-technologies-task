const router = require("express").Router();
const localAuthenticate =require('../middleware/localAuthenticate');
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passport = require('passport');
router.post("/",localAuthenticate, async (req, res,) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = user.generateAuthToken();
    res.status(200).header('Authorization', `Bearer ${token}`).send({ token, message: "Logged in successfully",data:user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;
