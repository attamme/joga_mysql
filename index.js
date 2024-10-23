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

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

con.connect((err) => {
    if (err) throw err; 
    console.log('Connected to the database');
})

// show all articles - index page
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', { articles: articles });
    })
});

// show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT * FROM article WHERE slug = '${req.params.slug}'`;
    let article
    con.query(query, (err ,result) => {
        if (err) throw err;
        article = result[0];
        if (article.author_id) {
            let authorQuery = `SELECT name FROM author WHERE id = ${article.author_id}`;
            con.query(authorQuery, (err, authorResult) => {
                if (err) throw err;
                let authorName = authorResult.length > 0 ? authorResult[0].name : 'Unknown Author';
                article.authorName = authorResult[0].name;
                console.log("Author name found: ", authorName);
                res.render('article', { 
                    article: article, 
                    author_name: authorName
                });
            })
        }
    })
})

// show one authors articles
app.get('/article/author/:id', (req, res) => {
    let query = `SELECT * FROM article WHERE author_id = ${req.params.id}`;
    let articles = [];
    con.query(query, (err ,result) => {
        if (err) throw err;
        articles = result;
        res.render('author', { 
            articles: articles 
        });
    })
})


app.listen(3003, () => {
    console.log('App is started at http://localhost:3003');
})