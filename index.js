const express=require('express');
const env=require('./config/environment');
const PORT=8008; //dont change the port here. This is saved in OAuth callback, resetPassword also.
const app=express();
require('./config/view-helpers')(app);
const db=require("./config/mongoose");
const expressLayouts=require("express-ejs-layouts");
const cookieParser=require("cookie-parser");
const path=require("path");
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport_local_strategy");
const passportJWT=require("./config/passport_jwt_strategy");
const passportGoogle=require("./config/passport_google_oauth2_stategy");
const MongoDBStore = require('connect-mongodb-session')(session);
// const sassMiddleware = require('node-sass-middleware');
const flash=require("connect-flash");
const customMW=require("./config/middleware");
const morgan=require('morgan');

//pass the instance of httpServer to the io library
const httpServer=require("http").createServer(app);    
const chatSockets=require("./config/chat_sockets").chatSockets(httpServer);
httpServer.listen(5000,()=>{
    console.log("Chat server is listening on PORT 5000");
});

app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan(env.morgan.format,env.morgan.options));

if(env.name=='development'){
    // app.use(sassMiddleware({
    //     src:path.join(__dirname,env.asset_path,scss), 
    //     dest:path.join(__dirname,env.asset_path,css),
    //     debug: true,
    //     outputStyle:'extended',
    //     prefix: "/css/"
    // }));
}


app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static(path.join(__dirname,env.asset_path)));
//make the uplaods path available to the browser
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

//MW
app.use(expressLayouts);
// extract style and scripts from sub-pages(partials) into the layout
app.set("layout extractScripts", true);
app.set('layout extractStyles', true);

//express-session:cookie encryption 
app.use(session({
    name:"ConnectMe",
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: (1000*60*100)
    },
    store: new MongoDBStore({
            mongooseConnection:db,
            autoRemove:"disabled"
        }),
        function(err) {
            console.log(err||'connect-mongodb setup OK');
        }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMW.flashMW);

//home route
app.use("/",require("./routes/home"));

app.listen(PORT,function(err){
    if(err){
        console.log("Error ",err);
    }
    console.log(`Server is Up and running on http://localhost:${PORT}/`);
});