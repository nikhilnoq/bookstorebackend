
const express=require("express");
const router=express.Router()

const { addbook,
   updatebook,deletebook,
  getallorders,
changestatus } = require("../controllers/admincontrollers");

const {auth,isadmin}=require("../middlewares/userauth")

router.post("/admin/addbook",auth,isadmin,addbook)

router.put("/admin/updatebook",auth,isadmin,updatebook)
router.delete("/admin/deletebook",auth,isadmin,deletebook)


router.get("/admin/getallorders",auth,isadmin,getallorders)
router.put("/admin/changestatus/:id",auth,isadmin,changestatus)



module.exports=router
//addbook,updatebook,deletebook,
//getallbooks,getbookbyid,getallorders,
// changestatus