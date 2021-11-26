const mongoose=require("mongoose");
const multer=require("multer");
const path=require('path');
const AVATAR_PATH=path.join("/uploads/users/avatars"); //converts the string to path

const userSchema=mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    avatar:{
        type:String,
         
    }
},
{
    timestamps:true
});

//cb is callback function. diskStorage is local storage here.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
//assign static/global methods to the model. Global means available to all documents of this model 
//multer's storage is storage(variable above). single file wrt to avatar will be uploaded
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;
//avatarPath is like the common name for each uploaded avatar-file on this server. Later some uniqness would be added via date

const Users=mongoose.model("UsersDoc",userSchema);

module.exports=Users;