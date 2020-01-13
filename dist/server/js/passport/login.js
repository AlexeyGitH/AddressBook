var sqlite3 = require('sqlite3');

var LocalStrategy   = require('passport-local').Strategy;
//var bCrypt = require('bcrypt-nodejs');
var db = new sqlite3.Database('./DataBase/database.sqlite3');
module.exports = function(passport){


    passport.use(new LocalStrategy(
      function(username, password, done) {
        db.get('SELECT password FROM users WHERE username = ?', username, function(err, row) {
            //console.log('yes1');
            if (!row) return done(null, false);
            //console.log('yes2');
            //db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, row.password, function(err, row) {
            db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, password, function(err, row) {    
            if (!row) return done(null, false);
            //console.log(row);
            return done(null, row);
            });
        })
    }));
    
/*
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
*/    
}