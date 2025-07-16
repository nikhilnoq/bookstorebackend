const mongoose=require("mongoose")

const users=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    orders:[{
        type:mongoose.Types.ObjectId,
       ref:"ordermodel"
    }],
    favs:[{
        type:mongoose.Types.ObjectId,
       ref:"bookmodel"
    }],
    cart:[{
        type:mongoose.Types.ObjectId,
       ref:"bookmodel"
    }],
   
},{timestamps:true});

module.exports=mongoose.model("usermodel",users)