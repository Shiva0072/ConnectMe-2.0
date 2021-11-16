const express=require('express');
const app=express();
const db=require("./config/mongoose");
const expressLayouts=require("express-ejs-layouts");

//home route
app.use("/",require("./routes/home"));


app.set("view engine","ejs");
app.set("views","./views");
//MW
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set('layout extractStyles', true);


app.listen(8008,function(err){
    if(err){
        console.log("Error ",err);
    }
    console.log("Server is Up and running");
});