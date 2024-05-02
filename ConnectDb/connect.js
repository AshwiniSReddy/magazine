const mongoose = require("mongoose");

const connectDB=()=>{
    mongoose.set("strictQuery",false);
    mongoose.connect("mongodb+srv://ayelchell:ayelchell@cluster0.q573rwd.mongodb.net/").then((res)=>{
            console.log("Connected to DB")
    });
}

module.exports=connectDB