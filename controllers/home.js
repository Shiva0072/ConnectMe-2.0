const Post=require("../models/post");
const User=require("../models/userSchema");

// https://dev.to/paras594/how-to-use-populate-in-mongoose-node-js-mo0
module.exports.home=async (req,res)=>{
    //find all the post and for each-post populate its user and comment
    //and for each comment populate only the user 
    try{
        const posts=await Post.find({})
        .sort("-createdAt")
        .populate({path:'user'})
        .populate({
            path:"comments", //populate comments
            populate:{       // and then populate the User of this comment
                path: "User"
            }
        });

        const users=await User.find({});

        return res.render("Home",{
            posts:posts,
            all_users: users
        });
    }
    catch(err){
        console.error("Error in fetching this post !");return res.redirect("/users/signin");
    }
}