// import database connection
const con = require('../utils/db');

// show all articles - index page
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', { articles: articles });
    })
};

// show article by this slug
const getArticleBySlug = (req, res) => {
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
                res.render('article', { 
                    article: article, 
                    author_name: authorName
                });
            })
        }
    })
};

//export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
};