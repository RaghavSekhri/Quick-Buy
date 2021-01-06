const mongoose = require("mongoose");
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    orders: [
        {
            productId: String,
            title: String,
            img : String,
            price: Number,
            productQuantity: String,
            company: String
        }
    ],
    total:{
        type: Number,
        required: true
    }
})

module.exports = Order = mongoose.model('orders', OrderSchema)