// Requires Dependencies
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Middleware function in express that will parse incoming requests with JSON.
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
// Serves the public directory as static. 
app.use(express.static(path.join(__dirname, '/public')));
// ???
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Sets the view directory as our handlebars template.
app.set('views', './views');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Requires our models directory.
const models = require('./models');
// Requires our authorizations.
const auth_route = require('./routes/auth.js')(app, passport);
// Requires our passpoert javascript file.
require('./config/passport.js')(passport, models.user);
// Syncs our models with our tables, and checks for any errors.
models.sequelize.sync({
    force: false
}).then(function() {
    console.log('DB is good');
}).catch(function(err){
    console.log(err, 'DB update borked');
});

// Defines the port and sets the server to listening.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App now listening at localhost:${PORT}`));

