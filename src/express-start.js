const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//var crypto = require('crypto');
//var sqlite3 = require('sqlite3');
var passport = require('passport');

var cookieParser = require('cookie-parser');


// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(express.static('./client/dist/js/'));


//app.use(require('cookie-parser')());
// Passport init
//app.use(require('express-session')({
// secret: 'keyboard cat',
//  resave: true,
//  saveUninitialized: true
//}));

app.use(bodyParser.json({limit: '90mb'}));
app.use(bodyParser.urlencoded({limit: '90mb', extended: true}));

app.use(cookieParser());

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());





/*15.06.19
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var db = new sqlite3.Database('./DataBase/database.sqlite3');  
15.06.19*/




/*15.06.19
passport.use(new LocalStrategy(
  function(username, password, done) {
 /*   User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
      });
*/   
//console.log('Hello3!');

/*15.06.19
  db.get('SELECT password FROM users WHERE username = ?', username, function(err, row) {
    console.log('yes1');
    if (!row) return done(null, false);
    console.log('yes2');
    db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, row.password, function(err, row) {
      if (!row) return done(null, false);
      console.log(row);
      return done(null, row);
    });
  }
  )
}));
15.06.19*/



// Initialize Passport
var initPassport = require('./server/js/passport/init');
initPassport(passport);

var routes = require('./server/js/routes/index')(passport, fs);
app.use('/', routes);

/*15.06.19
app.post('/auth', passport.authenticate('local', { successRedirect: '/success',
                                                    failureRedirect: '/admin.html' }));
15.06.19*/
/*
app.post('/auth', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('OK !');
    //res.redirect('/dd');
    res.redirect(307, '/login_error.html');
    console.log('OK!!');
  });
*/


/*
app.post('/auth', function(req, res){

console.log('Hello1!');
var f = passport.authenticate('local', { successRedirect: '/good-login',
                                                    failureRedirect: '/bad-login' });
                                                  
                                                  
f(req, res);
console.log('Hello2!');

});
*/


/*15.06.19
passport.serializeUser(function(user, done) {
  return done(null, user.id);
});
15.06.19*/

/*
passport.deserializeUser(function(id, done) {
  db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});
*/


//app.post('/auth2d', function(req, res) {
//console.log('Hello!');
//  
//});


/*15.06.19
app.get('/api', function (req, res) {
  const itemlist = JSON.parse(fs.readFileSync('server/static/data/data.json', 'utf8'));
  res.send(itemlist);
});
15.06.19*/

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
