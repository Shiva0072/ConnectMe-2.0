const express=require("express");
const router=express.Router();

//controllers
const homeController=require("../controllers/home");

router.get("/",homeController.home);
//route on similar url 
router.use("/users",require("./users"));

module.exports=router;