const mongoose=require("mongoose")


const book=mongoose.Schema({
    imgurl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    lang:{
        type:String,
        required:true
    },
    category:{
        type:String,
        // required:true
    },


},{timestamps:true})

module.exports=mongoose.model("bookmodel",book)