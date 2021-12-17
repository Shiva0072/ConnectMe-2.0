const mongoose= require('mongoose');

const userToken=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "UsersDoc"
    },
    token:{
        type:String
    },
    isValid:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});

userToken.methods.destroy=function(){
    this.isValid=false;
    return;
}

const accessToken=mongoose.model("userToken",userToken);

module.exports=accessToken;