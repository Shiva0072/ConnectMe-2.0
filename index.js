const express=require('express');
const db=require("./config/mongoose");
const expressLayouts=require("express-ejs-layouts");
const cookieParser=require("cookie-parser");
const path=require("path");

const PORT=8008;
const app=express();

app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static(path.join(__dirname,"assets")));

//MW
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set('layout extractStyles', true);

//home route
app.use("/",require("./routes/home"));

app.listen(PORT,function(err){
    if(err){
        console.log("Error ",err);
    }
    console.log(`Server is Up and running on http://localhost:${PORT}/`);
});