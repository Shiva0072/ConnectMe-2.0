const express=require("express");
const router=express.Router();

//controllers
const homeController=require("../controllers/home");

router.get("/",homeController.home);
//route on similar url 
router.use("/users",require("./users"));
router.use("/posts",require("./posts"));
router.use("/comments",require("./comment"));
router.use("/api",require("./api/index"));

module.exports=router;