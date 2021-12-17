const nodemailer=require("../config/nodemailer");

module.exports.resetEmail= async (email,link)=>{
    try{
        await nodemailer.transporter.sendMail({
            from: "dashing.rahul072@gmail.com",
            to: email,
            subject: "reset your password",
            text: "Click on the link below for resetting your password ",
            html: `<p>${link}</p>`
        });
        console.log("reset mail sent successfully!");
    }
    catch(err){
        console.log("Error in sending email : ",err);
        return;
    }
};