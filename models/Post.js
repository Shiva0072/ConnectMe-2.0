const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UsersDoc'
    }
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;