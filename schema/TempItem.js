const mongoose = require('mongoose')

const tempitems = mongoose.Schema({
       product:{
           type:String,
           required:true
       },
       hsnno:{
        type:Number,
        required:true
       },
       expiry:{
        type:String
       },
       mrp:{
           type:Number,
           required:true

       },
       qt:{
        type:Number,
        required:true
       },
       rate:{
        type:Number,
        required:true
       },
       total:{
        type:Number,
        required:true
       },
       gst:{
        type:Number,
        required:true
       },
       gstAmount:{
        type:Number,
        required:true
       },
       withgst:{
        type:Number,
        required:true
       },
       disc:{
        type:Number,
        required:true
       },
       discAmount:{
        type:Number,
        required:true
       },
       withdisc:{
        type:Number,
        required:true
       }

})

module.exports = mongoose.model("tempitems",tempitems)

