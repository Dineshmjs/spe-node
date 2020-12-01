const sales = require('express').Router()
const salesSchema = require('../schema/Sales')
const tempitemSchema = require('../schema/TempItem')
const goodsSchema = require('../schema/Goods')

sales.get("/tempitem",async(req,res)=>{
    const data = await tempitemSchema.find()
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

    const insert = await new tempitemSchema(postdata)
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
    const deleteData = await tempitemSchema.deleteOne({_id:req.query.id})
    console.log(deleteData,req.query)
    if(deleteData){
        res.status(200).send(deleteData)
    }
    else{
        res.status(404).send("Error")
    }
    
})

sales.post("/",async(req,res)=>{
    const {payment,billingAddress,shippingAddress} = req.body
    // console.log(payment,billingAddress,shippingAddress)


    const tempdata = await tempitemSchema.find()
    const salesdata = await salesSchema.find()
    

    var total=0, totalgst=0, nop=0, invoicenumber= salesdata.length 

    for(x of tempdata){
        const {withdisc,gstAmount} = x
        total +=withdisc
        totalgst +=gstAmount
        nop +=1

        let item = await goodsSchema.findOne({product:x.product})
        let newAvailable = item.available - x.qt

        let update = await goodsSchema.updateOne({product:x.product}, {$set:{available:newAvailable}})   
        

    }

    const insertData = {
        bill:billingAddress,
        ship:shippingAddress,
        total:total,
        gst:totalgst,
        invoicenumber:invoicenumber,
        payment:payment,
        numofproduct:nop,
        status:"Success",
        items:tempdata
    }

    const insert = await new salesSchema(insertData)
    insert.save(async(err,doc)=>{
        if(err){
            res.status(404).send(err)
            console.log("sales",err)
        }
        if(doc){            
            const deleteTemp = await tempitemSchema.deleteMany()
            res.status(200).send(doc)        
                    
        }
    })
    


})

module.exports = sales