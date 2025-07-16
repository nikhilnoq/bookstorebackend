const express=require("express");
const router=express.Router()

const {auth}=require("../middlewares/userauth")
const {signup,login,viewuser,updateaddress,getallbooks,
    getrecentbooks,addbookfav,deletebookfav,getbookbyid,
getfavbook,addbookcart,deletebookcart,
 getallcart,placeorder,getorderhistory,
} =require("../controllers/usercontrollers")

//signup login jwt token bcrypt
router.post("/user/signup",signup)

router.post("/user/login",login)

router.get("/user/view",auth,viewuser)

router.put("/user/updateaddress",auth,updateaddress)
router.get("/user/getallbooks",getallbooks)


router.get("/user/getrecentbooks",getrecentbooks)
router.put("/user/addbookfav",auth,addbookfav)
router.get("/user/getbookbyid/:bookid",getbookbyid)

router.put("/user/deletebookfav",auth,deletebookfav)
router.get("/user/getfavbook",auth,getfavbook)
router.put("/user/addbookcart",auth,addbookcart)
router.put("/user/deletebookcart/:bookid",auth,deletebookcart)
router.get("/user/getallcart",auth,getallcart)
router.post("/user/placeorder",auth,placeorder)
router.get("/user/getorderhistory",auth,getorderhistory)


module.exports=router


// getrecentbooks,addbookfav,deletebookfav,
// getfavbook,addbookcart,deletebookcart,
// getallcart,placeorder,getorderhistory,


