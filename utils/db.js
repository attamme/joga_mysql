// setup database connection
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
    // here you can set connection limits and so on
});

con.connect(err => {
    if (err) throw err;
    console.log('Connection established');
});

module.exports = con;