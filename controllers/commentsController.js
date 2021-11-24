const Comment=require("../models/comment");
const Post=require("../models/post");

module.exports.createComment=async (req,res)=>{
    try{
        // console.log(req.body);
        let content=req.body.content;
        let id=req.body.post;
        let doc= await Post.findById(id);

        if(doc){
            let comment=await Comment.create({
                content:content,
                User:req.user.id,
                post:id
            });
            doc.comments.push(comment);
            doc.save();
            return res.redirect("/");
        }
    } 
    catch(err){
        console.log("Error in finding post while creating comment : ",err); return res.redirect("back");
    }
}

module.exports.deleteComment= async (req,res)=>{
    // console.log(`Comment id: ${req.params.id}`); res.redirect("back");
    try{
        let doc=await Comment.findById(req.params.id);
        if(doc && req.user.id==doc.User){
            // console.log("Reached here finally ");
            let postId=doc.post; //console.log(`doc.post = ${doc.post} and doc.post.id = ${doc.post.id}`);
            doc.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            // console.log("Successfully deleted the comment on this post");
            return res.redirect("back");
        }
    }
    catch(err){
        console.log("Error in finding post while creating comment : ",err); return res.redirect("back");
    }
}