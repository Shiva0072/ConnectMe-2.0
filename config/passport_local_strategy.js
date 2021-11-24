const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User=require("../models/userSchema");

//read the doc for proper use. This is all just a copy-paste 
//authenticating using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(Username, password, done) {
        //find the user and establish the identity something similar to manual sign-in
        // console.log(`Username = ${email} | passpord = ${password}`);
        User.findOne({ email: Username }, function (err, user) {
            
            // console.log("User from findOne query : ",user);

            if (err) { 
                console.log("Error in finding the user while logging-in");
                return done(err); 
                }
            if (!user) {
                console.log("User not found in the dB");
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password!==password) {
                console.log("Password is wrong. Please re-try");
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

//serializing(storing) the user into the keys. for efficient memory use we store only user's id
//the above function calls immediately the serializing function for storing the cookies and encryption is being done using express-session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
//deserializing the user, from the key in the cookies of request. deserializing is taking the cookies info and using it to locate the user in dB
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if(err) {console.log("Error in deserializing the user!"); return done(err,false);}
    //   console.log("User found after deserializing : ",user);
      return done(null,user);
    });
});


//Assigning 3 methods(functions) to the passport Object
//check if the user is authenticated(signed-in)
passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("Already Authenticated");
        return next();
    }
    else{
        console.log("Not authenticated to visit this page. Please sign-in");
        return res.redirect("/users/signin");
        // return next();
    }
}

//If user is authenticated then req.user contains the current signed-in user obtained from the session cookie and we are just sending this to locals for the views
passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        //sending it to the locals,i.e, assigning the info in res.locals
        res.locals.user=req.user;
    }
    return next();
}

//avoids the logged-in-User to visit the signIn and signUp pages
passport.avoidMoveBack=(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return next();
}




module.exports=passport;