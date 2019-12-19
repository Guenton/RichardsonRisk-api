const express = require("express");
const buildingApi = express();
const errHandler = require("../../../config/errHandler");
const Building = require("../../../models/building");

buildingApi.get("/", async (req, res) => {
  if (req.user.permissions.includes("read:locations")) {
    try {
      if (req.query.id) {
        const building = await Building.findById(req.query.id);
        res.status(200).json(building);
      } else if (req.query.sub) {
        const buildings = await Building.find({ subsidiary: req.query.sub });
        res.status(200).json(buildings);
      } else {
        const buildings = await Building.find();
        res.status(200).json(buildings);
      }
    } catch (err) {
      errHandler(err, res);
    }
  } else {
    res.status(403).send("You do not have the required rights to request location information");
  }
});

buildingApi.post("/", async (req, res) => {
  if (req.user.permissions.includes("create:locations")) {
    try {
      const id = await Building.findOne({ shorthand: req.body.name }).select("id");
      if (id) res.status(409).send("This Building Already Exists");
      else {
        const newBuilding = new Building(req.body);
        await newBuilding.save();
        res.status(201).send("Received and Stored");
      }
    } catch (err) {
      errHandler(err, res);
    }
  } else res.status(403).send("You do not have the required rights to create new locations");
});

buildingApi.put("/", async (req, res) => {
  if (req.user.permissions.includes("update:locations")) {
    try {
      await Building.findByIdAndUpdate(req.body._id, req.body);
      res.status(200).send("Received and Stored");
    } catch (err) {
      errHandler(err, res);
    }
  } else res.status(403).send("You do not have the required rights to create new locations");
});

buildingApi.delete("/", async (req, res) => {
  if (req.user.permissions.includes("delete:locations")) {
    if (req.query.id) {
      try {
        await Building.findByIdAndDelete(req.query.id);
        res.status(200).send("Received and Deleted");
      } catch (err) {
        errHandler(err, res);
      }
    } else res.status(400).send("Query String ID not received");
  } else res.status(403).send("You do not have the required rights to delete locations");
});

module.exports = buildingApi;
