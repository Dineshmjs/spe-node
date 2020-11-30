const mongoose = require('mongoose')

const address = mongoose.Schema({
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

module.exports = mongoose.model("addresses",address)