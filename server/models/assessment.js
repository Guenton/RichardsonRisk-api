const mongoose = require("mongoose");
const Schema = mongoose.Schema;

assessmentSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  subsidiary: String,
  building: Object,
  typeScore: Number,
  environmentScore: Number,
  areaScore: Number,
  assetScore: Number,
  visibilityScore: Number,
  barrierScore: Number,
  robberyScore: Number,
  incidentScore: Number,
  injuryScore: Number,
  illegalityScore: Number,
  vandalismScore: Number,
  totalScore: Number
});

module.exports = mongoose.model("Assessment", assessmentSchema);
