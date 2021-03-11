// Requires Dependencies
const express = require('express');
const connection = require('./config/connection');
const path = require('path');

// Defines the port
const PORT = process.env.PORT || 8080;

// Sets express module as a variable.
const app = express();

// Sets the public directory as static.
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ 
    defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const sequelize = require('./config/connection');
const service_controller = require('./controllers/service_controller');
const movies_controller = require('./controllers/movies_controller');
app.use('/service', service_controller);
app.use('/', movies_controller);
async function init () {
    try{
        await sequelize.authenticate(
        )
        console.log('connected to db')
    }
    catch(err) {
        console.log(err.message)
    }
    app.listen(PORT, () => console.log(`App now listening at localhost:${PORT}`));
    
}

init();

