const purches = require('express').Router()
const purchesSchema = require('../schema/Purches')
const tempitemSchema = require('../schema/TempItem')
const goodsSchema = require('../schema/Goods')

purches.get("/",async(req,res)=>{
    const purchesData = await purchesSchema.find()
    res.send(purchesData)
})

purches.post("/", async (req, res) => {
    const { payment, buyerAddress, invoicedate, invoicenumber } = req.body
    

    const tempdata = await tempitemSchema.find()
    
    var total = 0, totalgst = 0, nop = 0

    for (x of tempdata) {
        const { withdisc, gstAmount } = x
        total += withdisc
        totalgst += gstAmount
        nop += 1

        let item = await goodsSchema.findOne({ product: x.product })
        let newAvailable = item.available + x.qt

        let update = await goodsSchema.updateOne({ product: x.product }, { $set: { available: newAvailable } })

    }
    

    const insertData = {
        buyer:buyerAddress,
        invoicenumber:invoicenumber,
        invoicedate:invoicedate,
        payment:payment,
        numofproduct:nop, 
        total: total,
        gst: totalgst,        
        success: true,
        items: tempdata
    }

    // console.log("postdata",insertData)



    const insert = await new purchesSchema(insertData)


    insert.save(async (err, doc) => {
        if (err) {
            res.status(404).send(err)
            console.log("purches", err)
        }
        if (doc) {
            const deleteTemp = await tempitemSchema.deleteMany()
            res.status(200).send(doc)

        }
    })



})

purches.delete("/", async (req, res) => {
    const {id} = req.query
    
    const purchesData = await purchesSchema.findOne({_id:id})
    const {items} = purchesData

    var complete = 0
    

    for(x of items){
        const {product,qt} = x
        const goods = await goodsSchema.findOne({product:product})
        const {available} = goods
        let newAvailable = available - qt
        
        let update = await goodsSchema.updateOne({product:product},{$set:{available:newAvailable}})    
        
        if(update.ok === 1){
            complete +=1 
            console.log("complete",complete)
        }
        else{
            res.status(404).send("Something Wrong")
        }
    }

    if(items.length === complete){
        const deleteSale = await purchesSchema.deleteOne({_id:id}) 
        if(deleteSale.ok === 1){
            res.status(200).send("Bill Deleted")
            console.log(deleteSale)
        }
        else{
            res.status(404).send("Bill not Delete")
        }
    }  
    

})

purches.put("/", async (req, res) => {
    const {id} = req.body
    console.log(id)
    
    const purchesData = await purchesSchema.findOne({_id:id})
    const {items} = purchesData

    console.log(id,items)

    var complete = 0
    

    for(x of items){
        const {product,qt} = x
        const goods = await goodsSchema.findOne({product:product})
        const {available} = goods
        let newAvailable = available - qt
        
        let update = await goodsSchema.updateOne({product:product},{$set:{available:newAvailable}})    
        
        if(update.ok === 1){
            complete +=1 
            console.log("complete",complete)
        }
        else{
            res.status(404).send("Something Wrong")
        }
    }

    if(items.length === complete){
        const update = await purchesSchema.updateOne({_id:id},{$set:{success:false}}) 
        if(update.ok === 1){
            res.status(200).send("Bill Return")
            console.log(update)
        }
        else{
            res.status(404).send("Bill not Return")
        }
    }  
    

})

module.exports = purches