const goods = require('express').Router()
const goodsSchema = require('../schema/Goods')

goods.get("/",async(req,res)=>{
    const data = await goodsSchema.find() 
    res.send(data) 
})

// const product = require('express').Router()
// const goodsSchema = require('../schema/Product') 



goods.post("/",async(req,res)=>{
    
    const insert = await new goodsSchema({
        qt:0,
        ...req.body
    })

    await insert.save((err,doc)=>{
        if(doc){
            
            res.status(200).send(doc)
        }
        if(err){
            
            res.status(404).send(err)
        }
    })
   
})


goods.get("/autofill",async(req,res)=>{
    const data =await goodsSchema.findOne({_id:req.query.id})
    res.json(data)
})

goods.put("/",async(req,res)=>{
    const {_id,qt,__v,...data} = req.body

    const find = {
        _id:_id
    }
    const update = {
        $set:data
    }

    

    const updateResponse = await goodsSchema.updateOne(find,update)

    if(updateResponse){
        
        res.status(200).send(updateResponse)
    }
   
})

goods.delete("/",async(req,res)=>{
    const deleteData = await goodsSchema.deleteOne({_id:req.query.id})
    if(deleteData){
        res.status(200).send(deleteData)
    }
})





goods.get("/searchProduct",async(req,res)=>{    
    const data =await goodsSchema.findOne({product:{$regex : req.query.product}})     
    res.send(data)
})


module.exports = goods