const bookmodel=require("../models/books")
const ordermodel=require("../models/orders")
const addbook=async(req,res)=>{
    try{
        const {imgurl,title,desc,author,price,lang,category}=req.body

    const newbook=new bookmodel({
        imgurl,title,desc,author,price,lang,category
    })
   await newbook.save();
   return  res.status(200).json({
    msg:"book added",
    success:true,
})
    }catch(err){
        return  res.status(500).json({
            msg:"error in bookadd catch",
            success:false,
            error:err
        })
    }
}


const updatebook=async(req,res)=>{
    try{
        const {imgurl,title,desc,author,price,lang,category}=req.body

        const {bookid}=req.headers
const updatedbook= await bookmodel.findByIdAndUpdate(bookid,{imgurl,title,desc,author,price,lang,category})
   return  res.status(200).json({
    msg:"book updated",
    success:true,
})
    }catch(err){
        return  res.status(500).json({
            msg:"error in updatedbook catch",
            success:false,
            error:err
        })
    }
}

const deletebook=async(req,res)=>{
    try{
       
        const {bookid}=req.headers
 deleteb= await bookmodel.findByIdAndDelete(bookid);
   return  res.status(200).json({
    msg:"book deleted",
    success:true,
})
    }catch(err){
        return  res.status(500).json({
            msg:"error in deletebook catch",
            success:false,
            error:err
        })
    }
}




//get all orders admin
const getallorders=async(req,res)=>{
    try{
        const userdata=await ordermodel.find().populate({
            path:"book"
        })
        .populate({
            path:"user",
        }).sort({createdAt:-1});


    return  res.status(200).json({
       
        success:true,
      data:userdata
    })
    }catch(err){
        return  res.status(500).json({
            msg:"error in getallorders catch",
            success:false,
            error:err.message
        })
    }
}
    
//change status admin
const changestatus=async(req,res)=>{
        try{
        
          const {id}=req.params
          const { status } = req.body;
         // await ordermodel.findByIdAndUpdate(id,{status:req.body.status});
         await ordermodel.findByIdAndUpdate(id,{status});

        return  res.status(200).json({
            msg:"status updated successfully",
            success:true,
          
        })
        }catch(err){
            return  res.status(500).json({
                msg:"error in addbookfav catch",
                success:false,
                error:err
            })
        }
        }

module.exports={
            addbook,updatebook,deletebook,
            getallorders,
            changestatus
 }   