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

const Users=mongoose.model("UsersDoc",userSchema);

module.exports=Users;