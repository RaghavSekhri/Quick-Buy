const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    inCart: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = Product = mongoose.model('products', DataSchema)