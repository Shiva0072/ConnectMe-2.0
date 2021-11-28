const nodemailer=require("../config/nodemailer");

//just a method wrapped around the nodemaile sendMail. 
module.exports.newComment=async (comment)=>{
    // console.log("Inside Nodemailer Comment === ", comment);
    nodemailer.transporter.sendMail({
        from: 'dashing.rahul072@gmail.com', // sender address
        to: comment.User.email, // list of receivers
        subject: "New comment published on Post ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    },(err,info)=>{
        if(err) {console.log("Error in nodemailer sendMail ",err); return;}
        // console.log("Information obtained :" ,info);
        return;
    });
}

//the VSCode in suggestions shows that this function had a callback function with err and info provided as arguments. I just used it. 