const Post=require("../models/post");
const User=require("../models/userSchema");

// https://dev.to/paras594/how-to-use-populate-in-mongoose-node-js-mo0
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie("shi",23);
    // console.log("Welome home!");
    // return res.end();
    // return res.send("<h1>Welcome Home </h1>")

    //find all the post and for each-post populate its user and comment
    //and for each comment populate only the user 
    Post.find({})
    .populate({path:'user'})
    .populate({
        path:"comments", //populate comments
        populate:{       // and then populate the User of this comment
            path: "User"
        }
    })
    .exec((err,docs)=>{
        
        if(err){console.error("Error in fetching this post !");return res.redirect("back");}

        // console.log(docs);
        // docs.forEach(doc=>{
        //     console.log("/n===================================================/n");
        //     console.log("Post Here !");
        //     // console.log(doc.comments);//or
        //     // doc.comments.forEach(d => {
        //     //     console.log(d);
        //     // });
        // });
        // res.render("home",{posts:docs});

        User.find({},(err,docs2)=>{
            if(err) {console.error("Error in finding user(friends) for Home Page!"); return res.redirect("/users/signin"); }
            // console.log(docs2);
            if(docs){
                res.render("Home",{
                    posts: docs,
                    all_users: docs2
                });
            }
        });       

    });
}