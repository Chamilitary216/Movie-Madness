// Will export functions with the res to render our login pages.
module.exports.signup = function(req, res) {
    res.render('signup');
}

module.exports.login = function(req, res) {
    res.render('login');
}

module.exports.index = function(req, res) {
    res.render('index');
}

module.exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/login');
    });
}

