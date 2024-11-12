const express = require('express');
const app = express();

const path = require('path');
// add template engine
const hbs = require('express-handlebars');
// setup template engine directory and files extension
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))
// setup static public directory
app.use(express.static('public'));

const mysql = require('mysql2');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const articleRouter = require('./routes/article'); // import article route
const authorRouter = require('./routes/author'); // import author route

// use article route
app.use('/', articleRouter);
app.use('/author', authorRouter);



app.listen(3003, () => {
    console.log('App is started at http://localhost:3003');
})