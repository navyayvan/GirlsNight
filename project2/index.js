var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
var request = require('request');
var passport = require('passport');
var db = require('./models');
var session = require('express-session');
var ejsLayouts = require("express-ejs-layouts");
var flash = require('connect-flash');

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.use(session({
  secret: 'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.get('/', function(req, res) {
  res.render('index', {alerts: req.flash()});
});

app.use('/auth', require('./controllers/auth'));


var profileCtrl = require('./controllers/profile.js');
app.use('/profile', profileCtrl)

var searchCtrl = require('./controllers/search.js');
app.use('/', searchCtrl);

var resultCtrl = require('./controllers/result.js');
app.use('/result', resultCtrl);

var eventCtrl = require('./controllers/event.js');
app.use('/event', eventCtrl);


app.listen(3000);
