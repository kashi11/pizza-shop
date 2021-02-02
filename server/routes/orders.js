var express = require("express");
var router = express.Router();
var OrderModel = require("../models/order");
var { ObjectID } = require("mongodb");
/* GET orders */
OrderModel.deleteMany({});
router.get("/", function (req, res, next) {
  if (req.query.id==="completed") {
    OrderModel.find({ completed: true}, (err, orders) => {
      if (!err) {
        if (orders.length > 0) {
          res.send(orders);
        }
        else {
          res.status(404).json({ error: "No order" });
        }
      }
      else {
        console.log(err);
        res.status(500).json({ msg: "server error" });
      }
    })
  } else if (req.query.id==="inprogress") {
    OrderModel.find({ completed: false }, (err, orders) => {
      if (!err) {
        if (orders.length > 0) {
          res.send(orders);
        }
        else {
          res.status(404).json({ error: "No order" });
        }
      }
      else {
        console.log(err);
        res.status(500).json({ msg: "server error" });
      }
    })
  } else {
    OrderModel.find({}, (err, orders) => {
      if (!err) {
        if (orders.length > 0) {
          res.send(orders);
        }
        else {
          res.status(404).json({ error: "No order" });
        }
      }
      else {
        console.log(err);
        res.status(500).json({ msg: "server error" });
      }
    })
  }


});

router.post("/", function (req, res, next) {
  var data = req.body;
  var order = new OrderModel(data);
  order
    .save()
    .then((result) => {
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "error" });
    });
});

router.put("/", function (req, res, next) {
  var id = ObjectID(req.body.id);
  OrderModel.findOneAndUpdate({ _id: id }, { completed: true },{}, (err, order) => {
    if(!err){
      if(order!==null){
        console.log(order);
        res.status(200).json({msg: "success"});
      }
      else{
        res.status(404).json({msg: "error"});
      }

    }
    else{
      console.log(err);
      res.status(500).json({msg: "internal server error"});
    }
  })
});

module.exports = router;
