const Post=require("../models/post");
const Comment=require("../models/comment");

module.exports.createPost= async (req,res)=>{
    // console.log(req.body);
    // console.error(req.user);
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect("back");
    }
    catch(err){
        console.log("Error in creating new post!!"); return res.redirect("back");
    }
}

module.exports.deletePost=async (req,res)=>{
    try{
        let doc=await Post.findById(req.params.id);
        
        if(doc.user==req.user.id){
            doc.remove();
            await Comment.deleteMany({post:req.params.id});
            //all done successfully
            return res.redirect("back"); 
        }
    }
    catch(err){
        console.error("Error in deleting the post : ",err); return res.redirect("back");
    }
}