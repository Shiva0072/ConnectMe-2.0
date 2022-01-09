const mongoose=require("mongoose");

const likesSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersDoc'
    },
    likeable:{
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       refPath: "onModel" 
    },
    onModel:{
        type: String,
        required: true,
        enum: ['Comment','Post']
    }
},{
    timestamps:true
});

const likes=mongoose.model('likes',likesSchema);
module.exports=likes;
//likeable is ref to the object id: whether it is the id of the comment or post
//refpath and not ref is given, this refpath defines the ref to the `onModel` property to find the right model.
//enum is optional. It specifies these could be our possible options. 
