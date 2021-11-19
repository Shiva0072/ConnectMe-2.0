const express=require('express');
const db=require("./config/mongoose");
const expressLayouts=require("express-ejs-layouts");
const cookieParser=require("cookie-parser");
const path=require("path");
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport_local_strategy");
const MongoDBStore = require('connect-mongodb-session')(session);

const PORT=8008;
const app=express();

app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static(path.join(__dirname,"assets")));

//MW
app.use(expressLayouts);
// extract style and scripts from sub-pages(partials) into the layout
app.set("layout extractScripts", true);
app.set('layout extractStyles', true);

//express-session:cookie encryption 
app.use(session({
    name:"ConnectMe",
    secret: 'joe',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: (1000*60*15)
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

//home route
app.use("/",require("./routes/home"));

app.listen(PORT,function(err){
    if(err){
        console.log("Error ",err);
    }
    console.log(`Server is Up and running on http://localhost:${PORT}/`);
});