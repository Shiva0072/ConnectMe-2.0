const express=require("express");
const router=express.Router();

//controllers
const user=require("../controllers/user");

router.get("/",user.userPage);
router.get("/signup",user.signUp);
router.get("/signin", user.signIn);

router.post("/create",user.create);
router.post("/create-session",user.createSession);

router.get("/deleteSession",user.deleteSession);

router.get("/profile",user.profile);


module.exports=router;