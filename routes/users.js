const express=require("express");
const user=require("../controllers/user");
const passport=require("passport");
const { Router } = require("express");

const router=express.Router();

router.get("/signup",passport.avoidMoveBack,user.signUp);
router.get("/signin",passport.avoidMoveBack,user.signIn);

router.post("/create",user.create);

router.post("/create-session",passport.authenticate("local",{ failureRedirect: '/users/signin' }),user.create_session);

router.get("/profile",passport.checkAuthentication,user.profile);
router.get("/signout",user.signOut);

module.exports=router;