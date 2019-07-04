const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let productSchema = new Schema({
    "productId": String,
    "productName": String,
    "productPrice": Number,
    "productImage": String,
    "productNum": String,
})
module.exports = mongoose.model("goods", productSchema)