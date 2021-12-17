const queue=require("../config/kue");
const resetMailer=require("../mailers/passwordReset_mailer");

queue.process('resetPassword',function(job,done){
    // console.log("Jobs ",job.data);
    resetMailer.resetEmail(job.data.email,job.data.link);
    done(); 
});