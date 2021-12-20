const express=require("express");
const { toggleLike } = require("../controllers/likes");
const router=express.Router();

router.post("/toggle",toggleLike);

module.exports=router;