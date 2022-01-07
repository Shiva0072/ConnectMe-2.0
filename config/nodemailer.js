const nodemailer=require('nodemailer');
const ejs=require("ejs");
const path=require("path");
const { smtp } = require('./environment');

let transporter =nodemailer.createTransport(smtp);

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
 

