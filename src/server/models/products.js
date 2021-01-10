const mongoose = require('mongoose')
const shortId = require('shortid')

const products = mongoose.Schema({
    _id: {type: String, default: shortId.generate, required: true},
    availableSizes: {type: [String], required: true},
    image: {type: String, required: true},
    title: {type: String, required: true},
    description:  {type: String, required: true},
    price: {type: Number, required: true}
}, {timestamps: true})

module.exports =  mongoose.model('products', products)