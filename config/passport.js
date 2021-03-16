// Requires bCrypt for encrypting passwords.
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    // Local Sign Up.
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    // Hashes passwords with a salt added to the beginning to differentiate passwords that are the same.
    function(req, email, password, done) {
        const generateHash = function() {
            const salt = bCrypt.genSaltSync(10);
            const hash = bCrypt.hashSync(password, salt);
            return hash;
        };
        // This will find the column where the email === the user inpur for email.
        User.findOne({ 
            where: { 
                email: email 
            }
        }).then(function (user) {
            if (user) {
                return done(null, false, {
                    message: 'Email taken'
                })
            } else
            {
                var password = generateHash(password);
                var data = {
                    email: email,
                    password: password
                };

                User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
                }
            });
    }));
    
    //Local Sign In
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    // Checks the validation of the password by comparing its encryption with the password applied. Will return the result.
    function(req, email, password, done) {
        const User = user;
        const isValidPassword = function(userpass, password) {
            const result = bCrypt.compareSync(password, userpass);
            return result;
        };
        // Finds the user in the databse based on the email entered.
        User.findOne({ 
            where: { 
                email: email 
            }
            //If the user is not in the database, the terminal will return invalid login.
        }).then(function (user) {
            if (!user) {
                console.log('invalid user');
                return done(null, false, {
                    message: 'Invalid Login.'
                });
            } 
            //If the password is invalid, the terminal will return invalid login.
            if (!isValidPassword(user.password, password)) {
                console.log('invalid pw');
                return done(null, false, {
                    message: 'Invalid Login.'
                });
            }
            // If the password and email both match, the server will get the isers information. If it can not, we will get an error that says 'something went wrong'.
            const userInfo = user.get();
            return done(null, userInfo);
        }).catch(function(err) {
            return done(null, false, {
                message: 'Something went wrong'
            });
        });
    }));
    // Will serialize the user information to send it to the database.
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    // Will deserialize the user information to bring it back to the front end.
    passport.deserializeUser(function(id, done){
        User.findByPk(id).then(function(user){
            if(user) {
                const userinfo = user.get();
                done(null,userinfo);
            } else {
                done(user.errors, null);
            }
        });
    });


}

