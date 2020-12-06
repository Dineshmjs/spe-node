const mongoose = require('mongoose')

const buyeraddress = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gstin:{
        type:String
    },
    dlno:{
        type:String
    }
})

module.exports = mongoose.model("buyeraddress",buyeraddress)