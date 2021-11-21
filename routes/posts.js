const express=require("express");
const { createPost, deletePost } = require("../controllers/postsController");
const postRouter=express.Router();
const passport=require("passport");

postRouter.post("/create-post",passport.checkAuthentication,createPost);

postRouter.get("/deletePost/:id",passport.checkAuthentication,deletePost);

module.exports=postRouter;

