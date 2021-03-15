const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    //Local Sign Up
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function(req, email, password, done) {
        const generateHash = function() {
            const salt = bCrypt.genSaltSync(10);
            const hash = bCrypt.hashSync(password, salt);
            return hash;
        };

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

    function(req, email, password, done) {
        const User = user;
        const isValidPassword = function(userpass, password) {
            const result = bCrypt.compareSync(password, userpass);
            return result;
        };

        User.findOne({ 
            where: { 
                email: email 
            }
        }).then(function (user) {
            if (!user) {
                console.log('invalid user');
                return done(null, false, {
                    message: 'Invalid Login.'
                });
            } 
            if (!isValidPassword(user.password, password)) {
                console.log('invalid pw');
                return done(null, false, {
                    message: 'Invalid Login.'
                });
            }
            const userInfo = user.get();
            return done(null, userInfo);
        }).catch(function(err) {
            return done(null, false, {
                message: 'Something went wrong'
            });
        });
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
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

