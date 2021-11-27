const express=require("express");
const { createSession } = require("../../../controllers/api/v1/users");
const apiUserRouter=express.Router();

apiUserRouter.post("/create-session",createSession);

module.exports= apiUserRouter;