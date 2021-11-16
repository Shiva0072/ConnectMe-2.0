const express=require("express");
const router=express.Router();

//controllers
const user=require("../controllers/user");

router.get("/",user.userPage);
router.get("/signup",user.signUp);
router.get("/signin", user.signIn);

router.post("/create",user.create);

module.exports=router;