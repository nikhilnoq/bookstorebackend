const jwt=require("jsonwebtoken")
//const nodemailer = require("nodemailer");

const auth=async(req,res,next)=>{
    try{

        const token =
        req.headers.authorization?.split(" ")[1] || // Token in Authorization header (e.g., Bearer <token>)
        req.cookies?.cookiename || // Token in cookies
        req.body.token; // Token in body (fallback)
  
        if(!token){
           return res.status(500).json({
                msg:"token missing",
                success:false,
            })
        }

        try{
            const verify= jwt.verify(token,"secret12")
            //console.log(verify);
            
         req.user=verify
        //  console.log(verify)
        }catch(err){
            return  res.status(500).json({
                msg:"token expired please login",
                success:false,
                err:err
            })
        }
      next();
        
    }catch(err){
      return  res.status(500).json({
            msg:"error in auth catch",
            success:false,
            error:err
        })
    }

 
}

const isadmin=(req,res,next)=>{
    try{
      //  console.log(req.user.role);
        
        if(req.user.role!== "admin"){
            return  res.status(500).json({
                msg:"user not authrozied in admin routes",
                success:false,
            })
        }
        //   res.status(200).json({
        //     msg:"hello admin",
        //     success:true,
        // })
        next()
    }catch(err){
        return  res.status(500).json({
            msg:"error in isadmin catch",
            success:false,
            error:err
        })
    }
}

// utils/mailer.js
//const nodemailer = require("nodemailer");

// const sendorderconfirmation = async (toEmail, orderDetails) => {
//     const transporter = nodemailer.createTransport({
//         secure:true,
//         service: "smtp.gmail.com",
//         auth: {
//             user: "nik229048@gmail.com",
//             pass: "your_email_password"
//         }
//     });

//     const mailOptions = {
//         from: "nik229048@gmail.com",
//         to: toEmail,
//         subject: "Order Confirmation",
//         text: `Your order has been placed successfully.\nOrder Details: ${JSON.stringify(orderDetails)}`
//     };

//     await transporter.sendMail(mailOptions);
// };



module.exports={auth,isadmin}