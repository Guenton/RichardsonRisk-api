const express = require("express");
const assessmentApi = express();
const errHandler = require("../../../config/errHandler");
const Assessment = require("../../../models/assessment");

assessmentApi.get("/", async (req, res) => {
  if (req.user.permissions.includes("read:assessments")) {
    try {
      if (req.query.id) {
        const assessment = await Assessment.findById(req.query.id);
        res.status(200).json(assessment);
      } else if (req.query.sub) {
        const assessments = await Assessment.find({ subsidiary: req.query.sub });
        res.status(200).json(assessments);
      } else {
        const assessments = await Assessment.find();
        res.status(200).json(assessments);
      }
    } catch (err) {
      errHandler(err, res);
    }
  } else {
    res.status(403).send("You do not have the required rights to request location information");
  }
});

assessmentApi.post("/", async (req, res) => {
  if (req.user.permissions.includes("create:assessments")) {
    try {
      const newAssessment = new Assessment(req.body);
      await newAssessment.save();
      res.status(201).send("Received and Stored");
    } catch (err) {
      errHandler(err, res);
    }
  } else res.status(403).send("You do not have the required rights to create new assessments");
});

assessmentApi.put("/", async (req, res) => {
  if (req.user.permissions.includes("update:assessments")) {
    req.body.dateUpdated = new Date(Date.now());
    try {
      await Assessment.findByIdAndUpdate(req.body._id, req.body);
      res.status(200).send("Received and Stored");
    } catch (err) {
      errHandler(err, res);
    }
  } else res.status(403).send("You do not have the required rights to create new assessments");
});

assessmentApi.delete("/", async (req, res) => {
  if (req.user.permissions.includes("delete:assessments")) {
    if (req.query.id) {
      try {
        await Assessment.findByIdAndDelete(req.query.id);
        res.status(200).send("Received and Deleted");
      } catch (err) {
        errHandler(err, res);
      }
    } else res.status(400).send("Query String ID not received");
  } else res.status(403).send("You do not have the required rights to delete assessments");
});

module.exports = assessmentApi;
