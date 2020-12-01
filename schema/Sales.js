const mongoose = require('mongoose')

// const items = mongoose.Schema({
//     product:{
//         type:String,
//         required:true
//     },
//     hsnno:{
//      type:Number,
//      required:true
//     },
//     expiry:{
//      type:String
//     },
//     mrp:{
//         type:Number,
//         required:true

//     },
//     qt:{
//      type:Number,
//      required:true
//     },
//     rate:{
//      type:Number,
//      required:true
//     },
//     total:{
//      type:Number,
//      required:true
//     },
//     gst:{
//      type:Number,
//      required:true
//     },
//     gstAmount:{
//      type:Number,
//      required:true
//     },
//     withgst:{
//      type:Number,
//      required:true
//     },
//     disc:{
//      type:Number,
//      required:true
//     },
//     discAmount:{
//      type:Number,
//      required:true
//     },
//     withdisc:{
//      type:Number,
//      required:true
//     }
// })

const sales = mongoose.Schema({
    bill: {
        type: Object,
        required: true
    },
    ship: {
        type: Object,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    invoicenumber: {
        type: Number,
        required: true
    },
    invoicedate: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: String,
        required: true
    },
    numofproduct: {
        type: Number,
        required: true
    },
    status: {
        type: String
    },
    items:{
        type:Array,
        required:true
    }

})

module.exports = mongoose.model("sales",sales)