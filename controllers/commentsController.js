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
