var express = require("express");
var router = express.Router();
var MenuModel = require("../models/menu");

router.get("/", function (req, res, next) {
  MenuModel.find({type:req.query.type}, (err, item) => {
    if (!err) {
      if (item.length === 0) {
        res.status(404).json({ error: "No item" });
      } else {
        res.send(item);
      }
    } else {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  });
});

router.get("/cust", function (req, res, next) {
  MenuModel.find({}, (err, item) => {
    if (!err) {
      if (item.length === 0) {
        res.status(404).json({ error: "No item" });
      } else {
        res.send(item);
      }
    } else {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  });
});

router.post("/", function (req, res, next) {
  var data = req.body;
  var menu = new MenuModel(data);
  menu
    .save()
    .then((result) => {
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error" });
    });
});

router.delete("/", function (req, res, next) {
  MenuModel.findOneAndRemove({ _id: req.query.id }, (err, item) => {
    if (!err) {
      if (item) {
        res.status(200).json({ msg: "success" });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } else {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  });
});

module.exports = router;
