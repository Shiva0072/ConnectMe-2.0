module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie("shi",23);
    // console.log("Welome home!");
    // return res.end();
    // return res.send("<h1>Welcome Home </h1>")
    return res.render("home");
}