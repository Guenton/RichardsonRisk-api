const mongoose = require("mongoose");
const Schema = mongoose.Schema;

userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  isConfirmed: Boolean,
  isAdmin: Boolean
});

module.exports = mongoose.model("User", userSchema);
