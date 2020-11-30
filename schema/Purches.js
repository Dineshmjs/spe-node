const mongoose = require('mongoose')

const purches = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    invoicenumber:{
        type: Number,
        required: true
    },
    invoicedate:{
        type: Date,
        default: Date.now()
    },
    numofproduct:{
        type: Number,
        required: true
    },
    items:{
        type:Array,
        required:true
    }

})

module.exports = mongoose.model("purches",purches)