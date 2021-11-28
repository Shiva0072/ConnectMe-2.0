const nodemailer=require('nodemailer');
const ejs=require("ejs");
const path=require("path");

let transporter =nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // We are not going to do 2-factor authentication 
    auth: {
      user: "dashing.rahul072@gmail.com",
      pass: "Rahul_123",
    },
});

let renderTemplate=(req,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",realpath),
        data,
        function(err,template) {
            if(err) {console.log("Error in renderTemplate :",err); return;}
            mailHTML = template;
        }
    )
    return mailHTML;
    //path and data would be sent into the EJS template and mailHTML would be resulting EJS file
}

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
};
 

