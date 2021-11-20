const Post=require("../models/Post");

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie("shi",23);
    // console.log("Welome home!");
    // return res.end();
    // return res.send("<h1>Welcome Home </h1>")
    
    Post.find({}).populate('user').exec((err,docs)=>{
        // console.log(docs);
        res.render("home",{posts:docs});
    });
}