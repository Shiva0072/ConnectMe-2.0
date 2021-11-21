const Post=require("../models/post");
const Comment=require("../models/comment");

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

module.exports.deletePost=(req,res)=>{
    
    Post.findById(req.params.id,function(err,doc){
        if(err){console.error("Error in finding this post"); return res.redirect("back");}
        if(doc){
            if(doc.user==req.user.id){
                doc.remove();
                Comment.deleteMany({post:req.params.id},function(err){
                    if(err) {console.error("Error in deleting comments of this post"); return res.redirect("back");}
                });                
                res.redirect("back"); 
            }
        }
        else{
            console.log("Can't find this post. Please avoid fiddling with the website");
            return res.redirect("back");
        }
    });
}