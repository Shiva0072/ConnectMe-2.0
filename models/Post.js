const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UsersDoc'
    },
    //include the array of id(s) of all the comments on this post
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"    
        }
    ],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'likes'
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;