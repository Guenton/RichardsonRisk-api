const express = require("express");
const loginAuth = express();
const User = require("../../models/user");

// Response on catch errors
const errhandler = err => {
  console.error(err);
  res.status(500).send("A Server error has occured");
};

loginAuth.post("/", async (req, res) => {
  const userObj = req.body;
  userObj.username = req.user.sub;
  userObj.isConfirmed = false;
  const user = new User(userObj);
  try {
    const result = await user.save();
    res.status(201).send("recieved");
  } catch (err) {
    errhandler(err);
  }
});

loginAuth.get("/", async (req, res) => {
  const usernameObj = { username: req.user.sub };
  try {
    const result = await User.findOne(usernameObj);
    res.status(200).json(result);
  } catch (err) {
    errhandler(err);
  }
});

module.exports = loginAuth;
