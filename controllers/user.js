module.exports.userPage=function(req,res){
    return res.send("<h1> WELCOME to user page</h1>");
};

module.exports.signUp=function(req,res){
    return res.render("userSignUp",{
        title:"User Signup Here "
    });
};

module.exports.signIn=function(req,res){
    return res.render("userSignIn");
};