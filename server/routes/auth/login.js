const express = require("express");
const loginAuth = express();
const errHandler = require("../../config/errHandler");
const User = require("../../models/user");

// Store New user into DB or Update existing user
loginAuth.post("/", async (req, res) => {
  const userObj = req.body;
  userObj.username = req.user.sub;
  userObj.isConfirmed = true;
  try {
    const id = await User.findOne({ username: req.user.sub }).select("id");
    if (id) await User.findByIdAndUpdate(id, userObj);
    else {
      const newUser = new User(userObj);
      await newUser.save();
    }
    res.status(201).send("recieved");
  } catch (err) {
    errHandler(err, res);
  }
});

// Get User Information from db uses deoded bearer info.
loginAuth.get("/", async (req, res) => {
  try {
    const result = await User.findOne({ username: req.user.sub });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    errHandler(err, res);
  }
});

module.exports = loginAuth;
