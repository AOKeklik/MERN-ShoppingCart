const router = require('express').Router()
const products = require('../models/products')

router.get('/', async (req, res) => {
    try{
        const getProducts = await products.find({})
        res.json(getProducts)
    }catch(err){
        res.status(500).json({"errorMessage": err.message})
    }
})
router.post('/', async (req, res) => {
    const newProducts = new products(req.body)
    try{
        const saveProducts = await newProducts.save()
        res.status(201).json(saveProducts)
    }catch(err){
        res.status(400).json({"errorMessage": err.message})
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const deleteProducts = await products.findByIdAndDelete(req.params.id)
        res.json(deleteProducts)
    }catch(err){
        res.status(500).json({"errorMessage": err.message})
    }
})

module.exports = router
