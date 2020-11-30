const mongoose = require('mongoose')

const buyeraddress = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("buyeraddress",buyeraddress)