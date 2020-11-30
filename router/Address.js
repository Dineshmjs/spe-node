const address = require('express').Router()
const addressSchema = require('../schema/Address')


address.get("/",async(req,res)=>{
    const data = await addressSchema.find()
    res.send(data)
})

address.post('/',async(req,res)=>{
    
    const insert = await new addressSchema(postData)
    insert.save((err,doc)=>{
        console.log(err,doc)
    })
})

module.exports = address