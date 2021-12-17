//different queues requires different workers but diff workers can also work on same queue.
const queue=require("../config/kue");
const commentMailer=require("../mailers/comments_mailer");

queue.process('emails',function(job,done){
    // console.log("Emails worker is processing the job : ", job.data );

    commentMailer.newComment(job.data);

    done();
}); 
//queue is an aaray of tasks (with optional defined priorities).
// Every worker has its process function. Name of the queue here is "emails" (can be anything).
//process function tells the worker, that whenever some new task is added into your queue, you need to run this code.
//here, task: send an email to the person who commented on the post. sending email is done via nodemailer
//done is cb function. 
