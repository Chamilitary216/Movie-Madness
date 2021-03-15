const auth_controller = require('../controllers/auth_controller.js');

module.exports = function(app, passport) {

    app.get('/signup', auth_controller.signup);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
    }));

    app.get('/login', auth_controller.login);

    app.get('/logout', auth_controller.logout);

    app.get('/', isLoggedIn, auth_controller.index);

    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/login')
    }

    //New routes go here....
    //example- app.get('/somePage', isLoggedIn, somePage_contorller.blah);

}

