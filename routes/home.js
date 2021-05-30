const express=require("express");
const router=express.Router();

//controllers
const homeController=require("../controllers/home");

router.get("/",homeController.home);

module.exports=router;