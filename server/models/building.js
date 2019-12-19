const mongoose = require("mongoose");
const Schema = mongoose.Schema;

buildingSchema = new Schema({
  name: String,
  address: String,
  type: String,
  subsidiary: String
});

module.exports = mongoose.model("Building", buildingSchema);
