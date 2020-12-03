const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Port = process.env.PORT || 2000



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

const url ="mongodb+srv://root:dineshmjs@cluster0-y8uer.gcp.mongodb.net/spe"
// const url = "mongodb://localhost:27017/spe" 

mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify : false  },(err)=>{
    if(!err){
        console.log("Mongodb Connectced")
    }
    if(err){
        console.log(err)
    }
})

app.listen(Port, () => {
    console.log("Server run port 2000")
})

