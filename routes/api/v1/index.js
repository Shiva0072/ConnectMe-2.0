const express=require("express");
const v1Router=express.Router();

v1Router.use("/posts",require("./posts"));
v1Router.use("/users",require("./users"));

module.exports= v1Router;