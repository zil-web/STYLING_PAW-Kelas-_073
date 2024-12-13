const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    login(req,res){
        res.render("login",{
            url : 'http://localhost:3000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    loginAuth(req,res){
        let username = req.body.username;
        let password = req.body.pass;
        if (username && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM users WHERE username = ? AND password = SHA2(?,512)`
                , [username, password],function (error, results) {
                    if (error) throw error;  
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.userid = results[0].id;
                        req.session.username = results[0].username;
                        console.log('Session username:', req.session.username);
                        res.redirect('/');
                    } else {
                        req.flash('color', 'danger');
                        req.flash('status', 'Oops..');
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login');
                    }
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },
    logout(req,res){
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}