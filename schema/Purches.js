const mongoose = require('mongoose')

const purches = mongoose.Schema({
    buyer:{
        type: Object,
        required: true
    },
    invoicenumber:{
        type: String,
        required: true
    },
    invoicedate:{
        type: String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },

    numofproduct:{
        type: Number,
        required: true
    },
    total:{
        type:Number,
        required:true
    },
    gst:{
        type:Number,
        required:true
    },
    success:{
        type: Boolean,
        required:true
    },
    items:{
        type:Array,
        required:true
    }

})

module.exports = mongoose.model("purches",purches)