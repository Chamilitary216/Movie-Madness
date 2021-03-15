/*const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const isAuthenticated = require('../config/middleware/isAuthenticated');

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view-engine', 'handlebars');

module.exports = function(app) {
    app.get("/", function(req, res) {
        if (req.user) {
            return res.render('index', { index: index});
        };
        return res.render('login', {login: login});
    });
};
*/