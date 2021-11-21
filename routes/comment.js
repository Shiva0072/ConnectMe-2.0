const express=require("express");
const passport = require("passport");
const { createComment } = require("../controllers/commentsController");
const commentRouter=express.Router();

commentRouter.post("/create",passport.checkAuthentication,createComment);

module.exports=commentRouter;