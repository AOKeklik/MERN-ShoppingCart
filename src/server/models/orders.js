const mongoose = require('mongoose')
const shortId = require('shortid')

const orders = mongoose.Schema({
    _id: {type: String, default: shortId.generate, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    cartItems: {type: [{
        _id: String,
        title: {type: String, required: true},
        price: {type: Number, required: true},
        count: {type: Number, required: true}
    }], required: true},
    total: {type: Number, required: true},
}, {timestamps: true})

module.exports = mongoose.model('orders', orders)