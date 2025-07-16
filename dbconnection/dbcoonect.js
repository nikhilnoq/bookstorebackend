const mongoose=require("mongoose")

require("dotenv").config()
const DB_URL=process.env.DB_URL
const dbconnect=()=>{
mongoose.connect(DB_URL).then(()=>{
    console.log("Db connected")
})
.catch((err)=>{
    console.log(err,"db connection err")
})
}

module.exports=dbconnect;