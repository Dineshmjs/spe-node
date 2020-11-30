const mongoose = require('mongoose')

const sales = mongoose.Schema({
    bill: {
        type: String,
        required: true
    },
    ship: {
        type: String,
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