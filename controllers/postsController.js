const Post=require("../models/post");
const Comment=require("../models/comment");
const likes=require("../models/likes");

module.exports.createPost= async (req,res)=>{
    // console.log(req.body);
    // console.error(req.user);
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created !"
            });
        }

        req.flash("success","Post published");
        return res.redirect("back");
    }
    catch(err){
        req.flash("error",err);
        console.log("Error in creating new post!!"); return res.redirect("back");
    }
}

module.exports.deletePost=async (req,res)=>{
    try{
        let doc=await Post.findById(req.params.id);
        
        if(doc.user==req.user.id){
            await likes.deleteMany({likeable: doc.id,onModel:"Post"});                             //likes on this post
            await likes.deleteMany({_id:{$in: doc.comments}});                                     //likes on all the comments of this post
            doc.remove();                                                                          //this post
            await Comment.deleteMany({post:req.params.id}); // <=> doc._id                         //comments on this post
      
            if(req.xhr){
                return res.status(200).json({
                    data:{post_id: req.params.id},
                    message: "Post deleted"
                });
            }

            //all done successfully
            req.flash("success", "Post and associated comments deleted ");
            return res.redirect("back"); 
        }
    }
    catch(err){
        req.flash("error","You cannot delete this post");
        console.error("Error in deleting the post : ",err); return res.redirect("back");
    }
}