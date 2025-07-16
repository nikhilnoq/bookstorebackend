const mongoose=require("mongoose")


const order=mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"usermodel"
    },
     book:{
        type:mongoose.Types.ObjectId,
        ref:"bookmodel"
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out for delivery","delivered","cancelled"]
    },


},{timestamps:true})

module.exports=mongoose.model("ordermodel",order)