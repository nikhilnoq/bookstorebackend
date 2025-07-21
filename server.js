const express=require("express")
const app=express()
require("dotenv").config()
const port=process.env.PORT
const cors=require("cors")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//const nodemailer=require("nodemailer")
const dbconnect=require("./dbconnection/dbcoonect")
dbconnect();

const userroutes=require("./routes/userroutes")
const adminroutes=require("./routes/adminroutes")

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//     service: "gmail", // For Gmail
//     auth: {
//       user: "r16304565@gmail.com", // Your email
//       pass: "nm", // Your email password or app password
//     },
//   });

//   app.post("/sendemail", async (req, res) => {
//     const { by, to, text } = req.body;
  
//     try {
//       await transporter.sendMail({
//         from: "r16304565@gmail.com", // Sender's email
//         by, // Receiver's email
//         to, // Email subject
//         text, // Email body
//       });
  
//       res.status(200).send("Email sent successfully");
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).send("Failed to send email");
//     }
//   });


app.use("/bks",userroutes)
app.use("/bks",adminroutes)
app.listen(port,(err)=>{
    console.log(`server started at ${port}`); 
})

// app.get("/",(req,res)=>{
//     res.send("hrllo");
// })