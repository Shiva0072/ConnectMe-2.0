const Users=require("../models/userSchema");
const accessToken=require("../models/accessToken");
const crypto=require("crypto");
const resetMailer=require("../mailers/passwordReset_mailer");

module.exports.resetPassword=(req,res)=>{
    return res.render("user_reset_password");
    // return res.send("visited!");
}

module.exports.resetSendEmail= async (req,res)=>{
    try{
        // console.log(req.body);
        const doc=await Users.findOne({email : req.body.email});
        // console.log(doc);
        const userToken=await accessToken.create({
            User: doc.id,
            token: crypto.randomBytes(20).toString("hex")
        });
        
        // console.log("User token created : ",userToken);
        const reset_link=`http://localhost:8008/users/reset/changePassword/?token=${userToken.token}`;
        // console.log(reset_link);
        resetMailer.resetEmail(doc.email,reset_link);
    
        
        return res.send("opkay");
    }
    catch(err){
        console.log("Error in reseting password :",err);
        return;
    }   
}

module.exports.changePassword=(req,res)=>{
    return res.send("Mail is sent successfully");
}