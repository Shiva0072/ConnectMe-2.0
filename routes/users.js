const express=require("express");
const user=require("../controllers/user");
const passport=require("passport");
const { Router } = require("express");

const router=express.Router();

router.use('/reset',require('./reset.js'));

router.get("/signup",passport.avoidMoveBack,user.signUp);
router.get("/signin",passport.avoidMoveBack,user.signIn);

router.post("/create",user.create);

router.post("/create-session",
passport.authenticate("local",{ failureRedirect: '/users/signin',failureFlash: 'Invalid username or password.',successFlash: 'Welcome!' })
,user.create_session);

router.get("/profile/:id",passport.checkAuthentication,user.profile);
router.post("/update/:id",passport.checkAuthentication,user.updateUser);

///include {"email"}
router.get("/auth/google", passport.authenticate('google', { scope: ['profile',"email"] }));
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect: "/users/signin"}),user.create_session);

router.get("/signout",user.signOut);

module.exports=router;