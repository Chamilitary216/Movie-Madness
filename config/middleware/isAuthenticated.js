// Added ristriction to website if user is not authenticated.
// If the user is valid, the application will proceed.
module.exports = function(req, res, next) {
    if(req.user) {
        return next();
    }
    // If the user is not valid, we will redirect to the login page.
    return res.redirect("/");
}