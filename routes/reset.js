const express=require("express");
const router=express.Router();
const reset=require("../controllers/reset");

router.get("/reset_password",reset.resetPassword);
router.post("/verify_email",reset.resetSendEmail);
router.get("/changePassword",reset.changePassword);

module.exports=router;