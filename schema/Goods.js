const mongoose = require('mongoose')

const goods = mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    hsnno:{
        type:Number,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    available:{
        type:Number,
        required:true
    },
    gst:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("goods",goods)