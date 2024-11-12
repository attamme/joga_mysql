// import database connection
const con = require('../utils/db');

const getAuthorArticles = (req, res) => {
    const authorId = req.params.author_id;

    const authorQuery = `SELECT * FROM author WHERE id = ${authorId}`;
    const articlesQuery = `SELECT * FROM article WHERE author_id = ${authorId}`;

    con.query(authorQuery, (err ,authorResult) => {
        if (err) throw err;
        if (authorResult.length === 0) {
            return res.status(404).send('Author not found');
        }
        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;
            res.render('author', {
                author: authorResult[0],
                articles: articlesResult,
                title: `Articles by ${authorResult[0].name}`
            });
        });
    })
}

//export controller functions
module.exports = {
    getAuthorArticles
};