const sales = require('express').Router()
const salesSchema = require('../schema/Sales')
const tempitem = require('../schema/TempItem')

sales.get("/tempitem",async(req,res)=>{
    const data = await tempitem.find()
    if(data){
        res.status(200).send(data)
    }
    else{
        res.status(404).send("Data not Found")
    }
})

sales.post("/tempitem",async(req,res)=>{

    const {input,custom } = req.body 
    const {product,hsnno,mrp,gst,available} = custom
    const {qt,rate,disc,exp} = input

    const total = qt * rate
    const gstAmount = (total * gst) / 100
    const withgst = total + gstAmount
    const discAmount = (withgst * disc) / 100
    const withdisc = withgst - discAmount


    const postdata = {
        product:product,
        hsnno:hsnno,
        expiry:exp,
        mrp:mrp,
        qt:qt,
        rate:rate,
        total:total,
        gst:gst,
        gstAmount:gstAmount,
        withgst:withgst,
        disc:disc,
        discAmount:discAmount,
        withdisc:withdisc

    } 

    const insert = await new tempitem(postdata)
    insert.save((err,doc)=>{
        if(doc){
            res.status(200).send(doc)
        }
        if(err){
            res.status(404).send(err)
        }
    })
    

    console.log(input,custom,postdata)
})

sales.delete("/tempitem",async(req,res)=>{
    const deleteData = await tempitem.deleteOne({_id:req.query.id})
    console.log(deleteData,req.query)
    if(deleteData){
        res.status(200).send(deleteData)
    }
    else{
        res.status(404).send("Error")
    }

})

module.exports = sales