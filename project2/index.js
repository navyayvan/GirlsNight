var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
var request = require('request');
var session = require('express-session');

app.use(session({
  secret: 'asdhk4t5i9238jsndlsti33tk',
  resave: false,
  saveUninitialized: true
}));

bcrypt.hash("myPassword", 10, function(err, hash) {
  //hash = encrypted password (using salt)
});

req.session.lastPage = '/myPage'

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	res.render('login.ejs');
})


app.listen(3000);