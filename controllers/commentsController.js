const { newComment } = require("../mailers/comments_mailer");
const queue=require('../config/kue');
const commentEmailWorker=require("../workers/comment_email_worker");
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

            let commentInfo=await comment.populate('User').execPopulate(); //doc(comment) is already there. Just populate it. We use it this way=> execPopulate() when doc is already fetched
            // let commentInfo=await Comment.findById(comment.id).populate("User"); //get the doc(comment) from the collection and on the way populate it
            // console.log("Comment created : ",commentInfo);

            //email to the commentor. //newComment(commentInfo);
            //instead of now directly mailing, we will now process them as delayed jobs. 
            //Add this to queue named as: 'emails'
            let job=queue.create('emails', commentInfo).save(function(err){
                if(err) {console.log("Error in sending to queue ",err); return;}

                console.log("job enqueued : ",job.id);
                //just running queue.create('emails', commentInfo).save(), gives the job
                // console.log("Job data : ", job.data);
            });


            return res.redirect("back");
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
            // console.log("Successfully deleted the comment and its likes on this post");
            req.flash("success","comment deleted");
            return res.redirect("back");
        }
    }
    catch(err){
        req.flash("error","authorization error");
        console.log("Error in finding post while creating comment : ",err); return res.redirect("back");
    }
}