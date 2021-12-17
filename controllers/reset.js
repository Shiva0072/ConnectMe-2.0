const Users=require("../models/userSchema");
const accessToken=require("../models/accessToken");
const crypto=require("crypto");
const resetPasswordWorker=require("../workers/password_reset_worker");
// const resetMailer=require("../mailers/passwordReset_mailer");
const queue=require("../config/kue");

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
        const reset_link=`http://localhost:8008/users/reset/changePasswordPage/?token=${userToken.token}`;
        // console.log(reset_link);

        // resetMailer.resetEmail(doc.email,reset_link);
        ////started using this as delayed job but with high priority to manage network traffic
        let job=await queue.create('resetPassword', {"email":doc.email, "link": reset_link})
        .priority("high")
        .save(function(err){
            if(err){
                console.log("Failed in enqueing the resetPassword task"); return;
            }
            console.log("Job enqueued : ",job.id);
        }); 

        return res.send("Please check your mail for reset link !");
    }
    catch(err){
        console.log("Error in reseting password :",err);
        return;
    }   
}

module.exports.changePasswordPage= async (req,res)=>{
    const token=await accessToken.findOne({token: req.query.token});
    if(token && token.isValid){
        return res.render("user_reset_password2",{token: req.query.token});
    }
    else{ return res.send("Token expired"); }
}

module.exports.changePassword=async (req,res)=>{
    try{
        // console.log("final stage : ",req.body);
        const {password,confirm_password} =req.body;
        if(password !== confirm_password){
            console.log("Passwords dont match!");
            return res.send("Passwords dont match! re-try");
        }

        if(req.body){
            const token=await accessToken.findOne({token: req.body.token});
            token.isValid=false;
            token.save();
            // console.log("User token : ",req.body.token);
            await Users.findByIdAndUpdate(token.User,{password: req.body.password});
            token.delete();
            console.log("Password changed!");
            return res.redirect("/users/signin");
        }
    }
    catch(err){
        console.log("error in fetching user using token : ",err);
        return;
    }
}