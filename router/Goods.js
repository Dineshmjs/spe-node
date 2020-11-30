const goods = require('express').Router()
const goodsSchema = require('../schema/Goods')

goods.get("/",async(req,res)=>{
    const data = await goodsSchema.find() 
    res.send(data) 
})

module.exports = goods