const buyeraddress = require('express').Router()
const buyeraddressSchema = require('../schema/BuyerAddress')

buyeraddress.post("/", async (req, res) => {
    // console.log("buyeraddress", req.body)
    const data = await new buyeraddressSchema(req.body)
    await data.save((err, doc) => {
        if (err) {
            // console.log(err)
            res.status(404).send(err)
        }
        if (doc) {
            // console.log(doc)
            res.status(200).send(doc)
        }
    })

})
buyeraddress.get("/", async (req, res) => {
    const data = await buyeraddressSchema.find()
    if (data) {
        res.status(200).send(data)
    }
    else {
        res.status(404).send()
    }
})

buyeraddress.put("/", async (req, res) => {
    // console.log("buyeraddress", req.body)
    const { _id, __v, ...data } = req.body

    const find = {
        _id: _id
    }
    const update = {
        $set: data
    }

    const updateData = await buyeraddressSchema.updateOne(find, update)

    if (updateData) {
        // console.log(updateData)
        res.status(200).send(updateData)
    }

})

buyeraddress.delete("/", async (req, res) => {
    const deleteItem = await buyeraddressSchema.deleteOne({ _id: req.query.id })
    res.status(200).send(deleteItem)
})

buyeraddress.post("/tempaddress",async(req,res)=>{
   
})

buyeraddress.get("/tempaddress",async(req,res)=>{

})

buyeraddress.put("/tempaddress",async(req,res)=>{

})

buyeraddress.delete("/tempaddress",async(req,res)=>{

})

module.exports = buyeraddress

