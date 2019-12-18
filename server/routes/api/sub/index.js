const express = require("express");
const subApi = express();
const errHandler = require("../../../config/errHandler");
const Sub = require("../../../models/sub");

subApi.post("/", async (req, res) => {
  if (req.user.permissions.includes("create:locations")) {
    try {
      const id = await Sub.findOne({ shorthand: req.body.shorthand }).select("id");
      if (id) res.status(409).send("This Subsidiary Already Exists");
      else {
        const newSub = new Sub(req.body);
        await newSub.save();
        res.status(201).send("Received and Stored");
      }
    } catch (err) {
      errHandler(err, res);
    }
  } else res.status(403).send("You do not have the required rights to create new locations");
});

subApi.get("/", async (req, res) => {
  if (req.user.permissions.includes("read:locations")) {
    try {
      if (req.query.sub) {
        const sub = await Sub.findOne({ shorthand: req.query.sub });
        res.status(200).json(sub);
      } else {
        const subs = await Sub.find();
        res.status(200).json(subs);
      }
    } catch (err) {
      errHandler(err, res);
    }
  } else {
    res.status(403).send("You do not have the required rights to request location information");
  }
});

subApi.put("/", async (req, res) => {
  if (req.user.permissions.includes("update:locations")) {
    try {
      await Sub.findByIdAndUpdate(req.body._id, req.body);
      res.status(200).send("Received and Stored");
    } catch (err) {
      errHandler(err, res);
    }
  } else res.status(403).send("You do not have the required rights to create new locations");
});

subApi.delete("/", async (req, res) => {
  if (req.user.permissions.includes("delete:locations")) {
    if (req.query.id) {
      try {
        await Sub.findByIdAndDelete(req.query.id);
        res.status(200).send("Received and Deleted");
      } catch (err) {
        errHandler(err, res);
      }
    } else res.status(400).send("Query String ID not received");
  } else res.status(403).send("You do not have the required rights to delete locations");
});

module.exports = subApi;
