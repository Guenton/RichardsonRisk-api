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
  try {
    const id = await User.findOne({ username: req.user.sub }).select("id");
    if (id) await User.findByIdAndUpdate(id, userObj);
    else {
      const newUser = new User(userObj);
      await newUser.save();
    }
    res.status(201).send("recieved");
  } catch (err) {
    errhandler(err);
  }
});

loginAuth.get("/", async (req, res) => {
  try {
    const result = await User.findOne({ username: req.user.sub });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    errhandler(err);
  }
});

module.exports = loginAuth;
