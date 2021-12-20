const likes=require("../models/likes");
const comments=require("../models/comment");
const post=require("../models/Post");

module.exports.toggleLike=async (req,res)=>{
    try{
        // users/like/toggle/?id=abcde&type=post
        // type could be post or comment and id would be its respective id
        let parent, deleted=false;

        if(req.query.type=="post"){
            parent=await post.findById(req.query.id).populate('likes');
        }else{
            parent=await comments.findById(req.query.id).populate('likes');
        }

        //check if like already exists
        let existingLike=await likes.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });
 
        //if like already existed then delete it
        if(existingLike){
            //delete from its parent and then delete it  
            parent.likes.pull(existingLike._id);
            parent.save();
            existingLike.remove();
            deleted= true;
        }
        else{
            // else make a new like documnent
            let newLike=await likes.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            
            parent.likes.push(newLike._id);
            parent.save();
        }
        return res.json(200,{
            message: "request successful",
            data:{
                deleted: deleted
            }
        })
    }
    catch(err){
        console.log("Error in toggling like : ",err);
        return;
    }
}