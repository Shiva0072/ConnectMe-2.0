const express=require("express");
const router=express.Router();

//controllers
const user=require("../controllers/user");

router.get("/",user.userPage);
router.get("/signup",user.signUp);

module.exports=router;