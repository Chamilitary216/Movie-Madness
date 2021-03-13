// Requires our dependencies.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Requires our models directory.
const db = require("../models");

// This instantiates that our login requirements are username and password.
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done) {
        // Finds credentials based off of email
        db.User.findOne({
            where: {
                email: email
            }
        //Defines functionality based on the credentials aquired from the user.
        }).then(function(dbUser) {
            // Validates username.
            if(!dbUser) {
                return done(null, false, {
                    message: 'Incorrect Username!!!'
                });
            }
            // Validates password.
            else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect Password!!!'
                });
            }
            // Returns the user if the above functions come back false.
            return done(null, dbUser);
        });
    }
));

// Boiler plate serialization and desserializationto help keep authentication state across HTTP requests.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, obj);
});

// Exports our passport
module.exports = passport;