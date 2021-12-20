const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user 
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "UsersDoc"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'likes'
    }]
},{
    timestamps:true
});

const Comment=mongoose.model("Comment",commentSchema);
module.exports=Comment;