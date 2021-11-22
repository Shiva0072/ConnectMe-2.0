const Comment=require("../models/comment");
const Post=require("../models/post");

module.exports.createComment=(req,res)=>{
    // console.log(req.body);
    const content= req.body.content;
    const _id=req.body.post;
    Post.findById(_id,function(err,doc){
        if(err){
            console.log("Error in finding post while creating comment"); return res.redirect("back");
        }
        if(doc){
            Comment.create({
                content:content,
                User:req.user._id,
                post:_id
            },
                function(err,comment){
                    if(err){console.log("Error in creating comment"); return;}
                    doc.comments.push(comment);//is only in RAM
                    doc.save();//gets saved in dB
                    res.redirect("/");
                }   
            );
            
        }
    });
    // return res.redirect("back");
}

module.exports.deleteComment=(req,res)=>{
    // console.log(`Comment id: ${req.params.id}`); res.redirect("back");

    Comment.findById(req.params.id,(err,doc)=>{
        if(err) {console.error("Error in finding the deleted Comment"); return res.redirect("back");}
        // console.log(req.user.id);
        // console.log(doc.User);
        // console.log(doc.User.id);
        if(doc && req.user.id==doc.User){
            // console.log("Reached here finally ");
            let postId=doc.post; //console.log(`doc.post = ${doc.post} and doc.post.id = ${doc.post.id}`);
            doc.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,doc){
                if(err) {console.error("Error in finding the post of this comment"); return res.redirect("back");}
                // console.log("Successfully deleted the comment on this post");
                return res.redirect("back");
            });
        }
        else{
            console.log("Please avoid fiddling with the system!");
            return res.redirect("back");
        }
    });
}