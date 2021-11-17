const Users=require("../models/userSchema.js");

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
    if(req.body.password!==req.body.confirm_password){ 
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
                return res.redirect("/users/signin");
            });
        }
        else{
            //user exits in DB. Go to the signIn page
            console.log("User already exits in dB. Please LogIN")
            return res.redirect("/users/signin");
        }
    });
};

module.exports.createSession=(req,res)=>{
    //match the email
    // console.log(req.body);
    //find the user
    Users.findOne({email : req.body.email},(err,doc)=>{
        if(err) {console.log("Error in finding the email in Doc"); return res.redirect("back");}

        //user with this email exits in DB
        if(doc){
            //check for password
            if(doc.password===req.body.password){
                console.log("User successfully authenticated!");
                res.cookie("user_id",doc._id);
                return res.redirect("/users/profile");
            }
            //passwords dont match
            console.log("Password is wrong");
            return res.redirect("back");
        }

        //no doc exits with this email id
        console.log("User doesnt exists in dB. Please sign-up");
        return res.redirect("/users/signup");
    });
    // res.redirect("back");
    //match the password if email matches
}

module.exports.profile=(req,res)=>{
    // console.log(req.cookies); this can help 
    // console.log(res.body); this cant help
    if(!Object.keys(req.cookies).length){
        console.log("Unauthenticated User! Please sign-in");
        return res.redirect("back");
    }

    Users.findById(req.cookies.user_id,(err,doc)=>{
        if(err){console.log("Error in cookie finding "); return res.redirect("back");}
        if(doc){
            // console.log(`We found this doc :  ${doc}`);
            res.render("profile",doc);
        }
        else{
            console.log("User is not there");
            return res.redirect("back");
        }
    })
}

module.exports.deleteSession=(req,res)=>{
    // console.log(req.cookies);
    res.clearCookie('user_id');
    // console.log(`Clearing the cookies ${res.clearCookie('user_id')}`);
    // console.log(req.cookie);
    res.redirect("/");
}