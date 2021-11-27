const express=require("express");
const passport = require("passport");
const {posts, deletePost} =require("../../../controllers/api/v1/posts");
const Post = require("../../../models/post");
const apiPostRouter=express.Router();


apiPostRouter.get("/",posts);
apiPostRouter.delete("/:id",passport.authenticate("jwt",{session:false}),deletePost); 

module.exports= apiPostRouter;