const router = require('express').Router()
const orders = require('../models/orders')

router.get('/', async (req, res) => {
    try{
        const getOrders = await orders.find({})
        res.json(getOrders)
    }catch(err){
        res.status(500).json({"errorMessage": err.message})
    }
})
router.post('/', async (req, res) => {
    const newOrders = new orders(req.body)
    try{
        const saveOrders = await newOrders.save()
        res.status(201).json(saveOrders)
    }catch(err){
        res.status(400).json({"errorMessage": err.message})
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const deleteOrders = await orders.findByIdAndDelete(req.params.id)
        res.json(deleteOrders)
    }catch(err){
        res.status(500).json({"errorMessage": err.message})
    }
})

module.exports = router