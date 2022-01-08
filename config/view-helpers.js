const environment = require("./environment")
const fs=require('fs');
const path=require('path');


module.exports=(app)=>{
    app.locals.assetPath=function(filepath){

        // console.log("===============================================================")
        // console.log("filepath recieved  : ",filepath);

        if(environment.name=='development'){
            return filepath;
        }
        
        
        // console.log("converted to : ",'/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filepath]);
        // console.log("===============================================================")
        
        return '/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filepath];

    }
}

/*
app.locals.key=value. just like res.locals.key=value. assigning new key-value pairs to transfer info from backend to frontend.

filepath=will be usually css/fileName.css from manifest

If the env is development, then return the file path as it is
if env is production then, else return the revisioned name of that file. 
//in return : we convert the JSON string into JSON object, then get the value of the key(filepath).   [filepath: revisioned_name]
// '/' is added since file path starts with css/../ or js/../ 
*/