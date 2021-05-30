const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String
},
{
    timestamps:true
});

const user=mongoose.models("userSchema",userSchema);

module.exports=user;