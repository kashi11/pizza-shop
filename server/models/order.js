var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    name: {type: String,required: true},
    flavour: {type: String,required: true},
    size: {type: String,required: true},
    crust: String,
    topping: String,
    price: String,
    completed: {default: false, type:Boolean},
    timestamp: {type: Date, default: Date.now}
});

var orderModel = mongoose.model("order",OrderSchema);
module.exports = orderModel;