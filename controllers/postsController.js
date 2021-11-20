const Post=require("../models/Post");

module.exports.createPost=(req,res)=>{
    // console.log(req.body);
    // console.error(req.user);
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err){
        if(err){
            console.log("Error in creating new post!!"); return res.redirect("back");
        }
    });

    return res.redirect("back");
}