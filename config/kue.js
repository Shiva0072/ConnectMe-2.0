const kue=require("kue");

const queue=kue.createQueue();

module.exports=queue;
//queue is a group of similar jobsEg: Emails, notifications, OTPs, etc.
//Now create worker for the queues. 
