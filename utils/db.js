// setup database connection
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
    // here you can set connection limits and so on
});

module.exports = db;