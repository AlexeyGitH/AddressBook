var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./DataBase/database.sqlite3');


var login = require('./login');
//var signup = require('./signup');
//var User = require('../models/user');

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
       // console.log('serializing user: ');console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
            if (!row)
                {done(null, false)}
            else
                {
                   // console.log('deserializing user:', row);
                    done(null, row);
                };    
        });
 
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    //signup(passport);

}