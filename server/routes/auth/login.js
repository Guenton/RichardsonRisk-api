const express = require("express");
const loginAuth = express();

loginAuth.post("/", (req, res) => {
  const user = req.body;
  user.username = req.user.sub;
  console.log(user);
  res.send("recieved");
});

module.exports = loginAuth;
