const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require("../models/userSchema");
const env=require('./environment');

const optns={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secretOrKey
};

passport.use(new JwtStrategy(optns, function(jwt_payload, done) {
    // console.log("JWT USER: ", jwt_payload);
    User.findById(jwt_payload.data._id, function(err, user) {
        
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports=passport;
