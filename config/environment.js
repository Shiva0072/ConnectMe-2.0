const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//creates the directory if it doesnt exists

const accessLogStream=rfs.createStream('access.log',{
  interval:'1d',
  path:logDirectory
});
//accessLogStream: when any user tries to access the api(s) then logs would be there. so i am accessing those log streams
//only the above lines are needed for rotating-file-stream package. Supply them as an option to morgan. And use morgan as a Middleware in index.js.

const development={
    name: 'development',
    asset_path:'/assets',
    session_cookie_key:'joe',
    // db:'ConnectMe',
    db:'mongodb+srv://shivam:Shivam@123@cluster0.pgrbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    smtp:{
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // We are not going to do 2-factor authentication 
        auth: {
          user: "dashing.rahul072@gmail.com",
          pass: "Rahul_123",
        },
    },
    google_client_ID: "723196947714-h85dk35up73doemn2dtf07st6p5l02s3.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_callback_URL: "http://localhost:8008/users/auth/google/callback",
    jwt_secretOrKey:'ConnetMe_Shivam', 
    morgan:{
      format:'dev',
      options:{stream: accessLogStream}
    } 
};

const production={
    name: process.env.CONNECTME_ENVIRONMENT,//production
    asset_path:process.env.CONNECTME_ASSET_PATH, // /public/assets
    session_cookie_key:process.env.CONNECTME_SESSION_COOKIE_KEY,
    // db:process.env.CONNECTME_DB,
    db:'mongodb+srv://shivam:Shivam@123@cluster0.pgrbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    smtp:{
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.CONNECTME_GMAIL_USER_NAME,
          pass: process.env.CONNECTME_GMAIL_USER_PASS,
        },
    },
    google_client_ID: process.env.CONNECTME_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.CONNECTME_CLIENT_SECRET,
    google_callback_URL: process.env.CONNECTME_CALLBACK_URL,  //http://connectMe.com/users/auth/google/callback
    jwt_secretOrKey:process.env.CONNECTME_JWT_SECRET_OR_KEY,  
    morgan:{
      format:'dev',
      options:{stream: accessLogStream}
    }
};

// module.exports=production;
// module.exports=development;
module.exports=eval(process.env.CONNECTME_ENVIRONMENT)==undefined ? development : eval(process.env.CONNECTME_ENVIRONMENT);
//eval: evaluates the variable/expression