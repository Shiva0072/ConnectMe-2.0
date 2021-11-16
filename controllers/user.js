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
                return res.redirect("/users/signin");
            });
        }
        else{
            //user exits in DB. Go to the signIn page
            console.log("User already exits in dB. Please LogIN")
            return res.redirect("/users/signin");
        }
    });

    // res.end();
};