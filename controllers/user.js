const Users=require("../models/userSchema.js");
const path=require("path");
const fs=require("fs");

module.exports.userPage=function(req,res){
    return res.send("<h1> WELCOME to user page</h1>");
};

module.exports.signUp=function(req,res){
    return res.render("user_sign_up",{
        title:"User Signup Here "
    });
};

module.exports.signIn=function(req,res){
    return res.render("user_sign_in",{
        title:"User signIn here "
    });
};

module.exports.create=(req,res)=>{
    // console.log(req.body);
    if(req.body.password!==req.body.confirm_password){ /// check with != as well
        console.log("Please enter the same passwords");
        return res.redirect("back");
    }

    Users.findOne({email : req.body.email},function(err,doc){

        if(err) {console.log(`Error in finding the doc with this ${email} email in the DB !`); return res.redirect("back");}

        if(!doc){
            //Users.create(req.body,..) works only when all the field names of the form are same as that of schema fields
            Users.create(req.body,function(err,doc){
                if(err) {console.log(`Error in creating the User in dB`); return;}
                console.log("User is created successfully in dB");
                req.flash("success","You are registered!");
                return res.redirect("/users/signin");
            });
        }
        else{
            //user exits in DB. Go to the signIn page
            req.flash("error","Error please re-try")
            console.log("User already exits in dB. Please LogIN")
            return res.redirect("/users/signin");
        }
    });
};

module.exports.profile=(req,res)=>{
    // console.log(req.params.id);
    Users.findById(req.params.id,(err,doc)=>{
        if(err) {console.error("Error in loading profile page!"); return res.redirect("back");}
        if(doc){
            return res.render("user_profile",{doc: doc});
        }
        else{
            return res.send("User is not found!");
        }
    })
}

module.exports.create_session=function(req,res){
    // console.log("From Create-session we got : ",req.user); //req.user is what we get according to passport
    // return res.render("user_profile",req.user);
    req.flash("success",`Welcome ${req.user.name}`);
    return res.redirect("/");
}

module.exports.signOut=(req,res)=>{
    req.logout();
    req.flash("success", "You have logged out !!");
    return res.redirect("/");
}

module.exports.updateUser= async (req,res)=>{
    // console.log(req.params.id);
    // if(req.user.id==req.params.id){
    //     Users.findByIdAndUpdate(req.params.id,req.body,function (err,doc) {
    //         if(err) {console.error("Error in finding and updating the doc"); return res.redirect("back");}
    //         if(doc){
    //             req.flash("success","details updated!");
    //             console.log("Successfully updated the infomation ");
    //             return res.redirect("back");
    //         }
    //     });
    // }
    // else{
    //     req.flash("error","Error ");
    //     return res.status(401).send("Unauthorized Request. Please dont fiddle with the website");
    // }

    //Users.uploadedAvatar is a static method. It is defined for the model itself. All the docs could refer it without making a separate copy of this methd for their own
    //Users.uplaodedAvatar is used as a callback function for the multer storage.
    //We cant use req.body directly(outside) since the form-type is now multipart, so we use multer as a MW. Users.uplaodedAvatar helps in parsing it.  
    if(req.user.id==req.params.id){
        try{
            let doc=await Users.findById(req.params.id);
            Users.uploadedAvatar(req,res,function(err){
                if(err){ console.error("Error with multer ",err);}
                // console.log(req.file,"\n", req.body);
                doc.name=req.body.name;
                doc.email=req.body.email;

                if(req.file){
                    //saving the path of the uploaded file into the avatar field in the user
                    doc.avatar=Users.avatarPath+"/"+req.file.filename;
                }
                doc.save();
            });
            return res.redirect("back");
        }
        catch(err){
            req.flash("error",err);
            console.error("Error in updating the user : ",err);
            return res.redirect("back");
        }
    }
    else{
        req.flash("error","Error ");
        return res.status(401).send("Unauthorized Request. Please dont fiddle with the website");
    }
}

