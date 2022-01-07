const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users=require('../models/userSchema');
const crypto=require("crypto");
const env=require('./environment');

// //tell passport to use new strategy for google login
// passport.use(new GoogleStrategy({
//     clientID: "723196947714-h85dk35up73doemn2dtf07st6p5l02s3.apps.googleusercontent.com",
//     clientSecret:"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",
//     callbackURL: "http://localhost:8008/users/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     //   console.log("Outside Profile : ",profile);
//     //   console.log("======================================================");
//     //find a User
//       Users.findOne({email: profile.emails[0].value },function(err,user){
//         if(err){ console.log("Error in Google Oauth ",err); return;}
//         //  return cb(null,user);
//         // console.log("Inside Profile ",profile); console.log("=====================================");
//         if(user){
//             //if found then passport will set this req.user=user
//             return cb(null,user);
//         }
//         else{
//             //create a new user
//             Users.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: crypto.randomBytes(20).toString("hex")
//             },function(err,user){
//                 if(err) {console.log("Error creating new user" ,err); return ;}
//                 return cb(null,user);
//             });
//         }
//     });
//   }
// ));

//async-await 
//tell passport to use new strategy for google login
passport.use(new GoogleStrategy({
    clientID: env.google_client_ID,
    clientSecret:env.google_client_Secret,
    callbackURL: env.google_callback_URL
  },
  async (accessToken, refreshToken, profile, cb)=>{
        //console.log("Outside Profile : ",profile);
        //find a User
        try{
            let doc = await Users.findOne({email: profile.emails[0].value });

            if(doc){
                return cb(null,doc);
            }
            else{
                //create the user in our server
                let newUser= await Users.create({name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                });
                return cb(null,newUser);
            }

        }
        catch(err){
            console.log("Error occured in OAuth google : ", err);
            return cb(err,null);
        }
    }
));




module.exports=passport;