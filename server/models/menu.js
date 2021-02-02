var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema({
    type: String,
    name: String,
    price: String
});

var menuModel = mongoose.model("menu",MenuSchema);
module.exports = menuModel;