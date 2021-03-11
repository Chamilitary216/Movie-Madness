const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.db_pass,
    database: 'streamsearch_db'
    });

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
