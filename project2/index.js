var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
var request = require('request');
var session = require('express-session');
var passport = require('passport');
var db = require('./models');
var flash = require('connect-flash');
var strategies = require('./config/strategies');
var ejsLayouts = require("express-ejs-layouts");

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


////////////////////////////////////////////////////////

passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

app.get('/', function(req,res) {
	res.render('login.ejs');
})



//password stuff

// app.use(session({
//   secret: 'asdhk4t5i9238jsndlsti33tk',
//   resave: false,
//   saveUninitialized: true
// }));

// bcrypt.hash("myPassword", 10, function(err, hash) {
//   //hash = encrypted password (using salt)
// });

// req.session.lastPage = '/myPage'


app.use(function (req, res, next) {
  req.getParamNames = function(){
    return Object.keys(req.params);
  }
  next();
});

app.get('/sum/:x/:y',function(req,res){
  res.send(req.getParamNames());
});
//outputs: ['x','y']

app.post('/', function(req, res) {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    res.redirect('/')
  }).catch(function(err) {
    res.send(err);
  })
});

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

app.get('/secret', function(req, res) {
  if (req.currentUser) {
    res.render('secret');
  } else {
    req.flash('danger', 'You must be logged in to view this page');
    res.redirect('/');
  }
});


app.listen(3000);