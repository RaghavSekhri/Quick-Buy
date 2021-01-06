const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            productId: String,
            title: String,
            img : String,
            price: Number,
            productQuantity: String,
            company: String
        }
    ]
})

module.exports = User = mongoose.model('users', UserSchema)