const jwt=require("jsonwebtoken");
const User=require("../../../models/userSchema");
const env=require('../../../config/environment');

module.exports.createSession= async (req,res)=>{
    try{
        let doc= await User.findOne({email: req.body.email});

        if(!doc || (doc.password != req.body.password)){
            return res.json(422,{
                message: "Invalid Username or password!"
            });
        }

        return res.json(200, {
            message: "Sign in successful, here is your token, please keep it safe!",
            token: jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: doc,
              }, env.jwt_secretOrKey)
            //// or
            // data: {
            //     token: jwt.sign(doc.toJSON(),"ConnetMe_Shivam",{expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
            // }
        });
        //secret key must be same while encrypting and decrypting the key
    }
    catch(err){
        console.error("Error in session creation using the API : ",err);
        res.json(500,{
            message: "Internal Server Error"
        });
    }
};

