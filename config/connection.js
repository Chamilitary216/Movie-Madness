const Sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.db_pass);
const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    username: 'appuser',
    password: process.env.db_pass,
    database: 'streamsearch_db',
    dialect: 'mysql'
    });

/*const modelDefiners = [require('../models/service_model')];
for(const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}
/*connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});
*/
module.exports = sequelize;
