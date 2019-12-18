const mongoose = require("mongoose");
const Schema = mongoose.Schema;

subSchema = new Schema({
  name: String,
  shorthand: String,
  location: String
});

module.exports = mongoose.model("Sub", subSchema);
