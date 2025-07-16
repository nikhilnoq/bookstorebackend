

const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const usermodel=require("../models/users")
const bookmodel=require("../models/books")
const ordermodel=require("../models/orders")
const jwt=require("jsonwebtoken")
const {sendorderconfirmation}=require("../middlewares/userauth")
//console.log(sendOrderConfirmation());
const signup=async(req,res)=>{

    try{
const {name,email,pass,address}=req.body

if(!name || !email || !pass || !address){
   return res.status(500).json({
        msg:"please fill all blocks",
        success:false,
    })
}

const prevuser= await usermodel.findOne({email})

if(prevuser){
   return res.status(500).json({
        msg:"user already exists",
        success:false,
    })
}

const hashpass= await bcrypt.hash(pass,10)

const newuser=await usermodel.create({name,email,pass:hashpass,address});

if(newuser){
    return res.status(200).json({
        msg:"user created",
        success:true,
    })
}



    }catch(err){
       return res.status(500).json({
            msg:"error in sign catch",
            success:false,
            error:err
        })
    }
}


// Appropriate Status Codes:

// 400: Bad Request (missing fields)
// 404: Not Found (user doesn't exist)
// 401: Unauthorized (invalid credentials)

const login=async(req,res)=>{

    try{
const {email,pass}=req.body

if( !email || !pass ){
   return res.status(500).json({
        msg:"please fill all blocks",
        success:false,
    })
}

const prevuser= await usermodel.findOne({email})

if(!prevuser){
   return res.status(500).json({
        msg:"user does not exists",
        success:false,
    })
}

const comparepass=await bcrypt.compare(pass,prevuser.pass)


if(!comparepass){
    return res.status(500).json({
        msg:"crediantials filled wrong",
        success:false,
    })
}

const payload={
    id:prevuser._id,
    email:prevuser.email,
    role:prevuser.role
}

const token=jwt.sign(payload,"secret12",{expiresIn:"2d"})


const actions={
    expires:new Date(Date.now()+2 *24*60*60*1000),
    httpsOnly:true
}

if(comparepass){
   return res.status(200).cookie("cookiename",token,actions).json({
        msg:"login successful",
        success:true,
        token:token,
        prevuser
    })
}



    }catch(err){
      return  res.status(500).json({
            msg:"error in login catch",
            success:false,
            error:err
        })
    }
}


const viewuser=async(req,res)=>{
   try{
const {id}=req.headers;

const data=await usermodel.findById(id).select("-pass");

return  res.status(201).json({
    msg:"user founded successfully",
    success:true,
  user:data
})

   }catch(err){
    return  res.status(500).json({
        msg:"error in viewuser catch",
        success:false,
        error:err
    })
   } 
}

//update adddress

const updateaddress=async(req,res)=>{
    try{

        const {id}=req.headers;

        const {address}=req.body;
        const newadd= await usermodel.findByIdAndUpdate(id,{address:address});

        return  res.status(200).json({
            msg:"address updated",
            success:true,
            newadd
        })
    }catch(err){
        return  res.status(500).json({
            msg:"error in updateaddress catch",
            success:false,
            error:err
        })
    }
}

//recently added books user
const getrecentbooks=async(req,res)=>{
    try{
//  const {bookid}=req.headers

 const books= await bookmodel.find({}).sort({createdAt:-1}).limit(4);

 return  res.status(201).json({
    
    success:true,
    data:books
 })}catch(err){
        return  res.status(500).json({
            msg:"error in getrecentbookd catch",
            success:false,
            error:err
    })
}}

const getallbooks=async(req,res)=>{
    try{
//  const {bookid}=req.headers

 const books= await bookmodel.find().sort({createdAt:-1});

 return  res.status(201).json({
    
    success:true,
    data:books
 })}catch(err){
        return  res.status(500).json({
            msg:"error in get allbooks catch",
            success:false,
            error:err
    })
}}

const getbookbyid=async(req,res)=>{
    try{
 const {bookid}=req.params

 const books=await bookmodel.findById(bookid)

 return  res.status(201).json({
    
    success:true,
    data:books
 })}catch(err){
        return  res.status(500).json({
            msg:"error in getbookbyid catch",
            success:false,
            error:err
    })
}}


const addbookfav=async(req,res)=>{
    try{
        const {bookid,id}=req.headers

        const userdata=await usermodel.findById(id)

        const isfav=userdata.favs.includes(bookid)

        if(isfav){
            return  res.status(200).json({
                msg:"book alredy in fav",
                success:true,
            })
        }

      await usermodel.findByIdAndUpdate(id,{$push :{favs:bookid}})

      return  res.status(200).json({
        msg:"add book to fav",
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

const deletebookfav=async(req,res)=>{
    try{
        const {bookid,id}=req.headers

        const userdata=await usermodel.findById(id)

        const isfav=userdata.favs.includes(bookid)

        if(isfav){
            await usermodel.findByIdAndUpdate(id,{$pull :{favs:bookid}})

        }

     
      return  res.status(200).json({
        msg:"removed book from fav",
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




const getfavbook=async(req,res)=>{
    try{

        const {id}=req.headers

        const userdata=await usermodel.findById(id).populate("favs")

        const favbooks=userdata.favs

        return  res.status(200).json({
           // msg:"error in addbookfav catch",
            success:true,
            data:favbooks
        })
    }catch(err){
        return  res.status(500).json({
            msg:"error in addbookfav catch",
            success:false,
            error:err
        })
    }
}


//add to cart
//put req
const addbookcart=async(req,res)=>{
    try{

        
        const {bookid,id}=req.headers

        const userdata=await usermodel.findById(id)

        const incart=userdata.cart.includes(bookid)

        if(incart){
            return  res.status(200).json({
                msg:"book already in cart",
                success:true,
            })
        }

      await usermodel.findByIdAndUpdate(id,{$push :{cart:bookid}})

      return  res.status(200).json({
        msg:"add book to cart",
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

//put not delete
const deletebookcart=async(req,res)=>{
    try{
        const {bookid}=req.params;
        const {id}=req.headers

        const userdata=await usermodel.findById(id)

        const incart=userdata.cart.includes(bookid)

        if(incart){
            await usermodel.findByIdAndUpdate(id,{$pull :{cart:bookid}})

        }

     
      return  res.status(200).json({
        msg:"removed book from cart",
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




//get
const getallcart=async(req,res)=>{
    try{

        const {id}=req.headers

        const userdata=await usermodel.findById(id).populate("cart")

        const cartbooks=userdata.cart.reverse()

        return  res.status(200).json({
           // msg:"error in addbookfav catch",
            success:true,
            data:cartbooks
        })
    }catch(err){
        return  res.status(500).json({
            msg:"error in addbookfav catch",
            success:false,
            error:err
        })
    }
}

//orders

//placeorder 
//post
const placeorder=async(req,res)=>{
try{
const {id}=req.headers
const {order}=req.body

for(const orderdata of order){
    const neworder=new ordermodel({user:id,book:orderdata._id});

    const orderdatafromdb=await neworder.save();
    //saving order in user model

 // ✅ Fetch user's email
 const user = await usermodel.findById(id);
 await sendorderconfirmation(user.email, order);


await usermodel.findByIdAndUpdate(id,{$push:{orders:orderdatafromdb._id}})
//clearing cart
await usermodel.findByIdAndUpdate(id,{$set:{cart:[]}})
}
return  res.status(200).json({
    msg:"order placed suceess",
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

//getorderhistory --user

const getorderhistory=async(req,res)=>{
try{
const {id}=req.headers

const userdata= await usermodel.findById(id).populate({
    path:"orders",
    populate:{
        path:"book"
    }
})
const orderdata=userdata.orders.reverse()


return  res.status(200).json({
   
    success:true,
  data:orderdata
})
}catch(err){
    return  res.status(500).json({
        msg:"error in getorderhistory catch",
        success:false,
        error:err
    })
}
}




// //get all orders admin

// const getallorders=async(req,res)=>{
//     try{
    
//         const userdata=await ordermodel.find().populate({
//             path:"books"
//         })
//         .populate({
//             path:"user",
//         }).sort({createdAt:-1});


//     return  res.status(200).json({
       
//         success:true,
//       data:userdata
//     })
//     }catch(err){
//         return  res.status(500).json({
//             msg:"error in addbookfav catch",
//             success:false,
//             error:err
//         })
//     }
//     }
    
//     //change status admin

// const changestatus=async(req,res)=>{
//         try{
        
//           const id=req.params

//           await ordermodel.findByIdAndUpdate(id,{status:req.body.status});

//         return  res.status(200).json({
//             msg:"status updated successfully",
//             success:true,
          
//         })
//         }catch(err){
//             return  res.status(500).json({
//                 msg:"error in addbookfav catch",
//                 success:false,
//                 error:err
//             })
//         }
//         }

module.exports={
    signup,login,viewuser,updateaddress,getallbooks,
    getrecentbooks,addbookfav,deletebookfav,
    getfavbook,addbookcart,deletebookcart,getbookbyid,
    getallcart,placeorder,getorderhistory,

}