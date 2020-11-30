const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json())

const goods = require('./router/Goods')
const address = require('./router/Address')
const sales = require('./router/Sales')
const purches = require('./router/Purches')
const buyerAddress = require('./router/BuyerAddress')

app.get("/",(req,res)=>{
    res.json("Root")
})

app.use("/goods",goods)
app.use("/address",address)
app.use("/sales",sales)
app.use("/purches",purches)
app.use("/buyeraddress",buyerAddress)

mongoose.connect("mongodb://localhost:27017/spe",{ useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if(!err){
        console.log("Mongodb Connectced")
    }
    if(err){
        console.log(err)
    }
})

app.listen(2000,()=>{
    console.log("Server run port 2000")
})

