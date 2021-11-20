const express=require("express");
const { createPost } = require("../controllers/postsController");
const postRouter=express.Router();
const passport=require("passport");

postRouter.post("/create-post",passport.checkAuthentication,createPost);

module.exports=postRouter;

