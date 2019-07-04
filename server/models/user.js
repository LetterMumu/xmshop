const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    "userId":String,
    "userName":String,
    "orderList":[{
        "orderId":String,
        "orderTotal" :Number,
        "addressInfo":Object,
        "goodsList":Array,
        "orderStatus":String,
        "createDate":String
    }],
    "cartList":[{
        'productId':String,
        "productName":String,
        "salePrice":Number,
        "productImage":String,
        "productNum":Number,
        "checked":String
    }],
    "addressList":[{
        "_Id":String,
        "userName":String,
        "streetName":String,
        "postCode":String,
        "tel":String,
        "isDefault":Boolean
    }]
})
module.exports = mongoose.model("user", userSchema)