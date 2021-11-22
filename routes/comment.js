const express=require("express");
const passport = require("passport");
const { createComment, deleteComment } = require("../controllers/commentsController");
const commentRouter=express.Router();

commentRouter.post("/create",passport.checkAuthentication,createComment);
commentRouter.get("/deleteComment/:id",passport.checkAuthentication,deleteComment);

module.exports=commentRouter;