const mongoose = require("mongoose");
const Schema = mongoose.Schema;

assessmentSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  building: String,
  buildingId: Number,
  subsidiary: String,
  subsidiaryId: Number,
  type: String,
  typeScore: Number,
  environment: String,
  environmentScore: Number,
  area: String,
  areaScore: Number,
  asset: String,
  assetScore: Number,
  visibility: String,
  visibilityScore: Number,
  barrier: String,
  barrierScore: Number,
  areaRobbery: String,
  areaRobberyScore: Number,
  highAreaRobbery: Boolean,
  highAreaRobberyScore: Number,
  crimeInjury: Boolean,
  crimeInjuryScore: Number,
  illegalAreaActivity: Boolean,
  illegalAreaActivityScore: Number,
  vandalismArea: Boolean,
  vandalismAreaScore: Number
});

module.exports = mongoose.model("Assessment", assessmentSchema);
