const Comment = require("../../../models/comment");
const Post = require("../../../models/post");

module.exports.posts= async (req,res)=>{

    let docs= await Post.find({})
    .sort("-createdAt")
    .populate('user')
    .populate({
        path: 'comments',
        populate: 'User'
    });


    return res.status(200).json({
        message: "Successful!",
        posts: docs
    });
};

module.exports.deletePost=async (req,res)=>{
    try{
        let doc= await Post.findById(req.params.id);

        if(doc.user==req.user.id){
            //user object is assigned to req object (req.user) by the passport automatically, once user is authenticated by passport
            doc.remove();
            await Comment.deleteMany({post: req.params.id});
    
            return res.json(200,{message: "Post and associated Comments deleted!"});
        }
        else{
            return res.json(401,{
                message:"User not Authorized!!"
            });
        }
    }
    catch(err){
        console.error("Error : ", err);
        return res.json(500,{
            message: "Internal Server Error",
            error: err
        });
    }
}


