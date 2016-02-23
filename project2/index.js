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

app.get('/profile', function(req,res) {
  // db.user.findById(req.session.userId).then(function(user) {
    // user.getEvents().then(function(events){
      //user.getHobbies().then(function(hobbies){
     //   res.render('profile', {events: events, user: user, hobbbies: hobbies})
     // })
      //
   // })
  //})
})

app.post('/profile/rsvp/:id', function(req,res) {
    var id = req.params.id;
    db.user.findById(req.session.userId).then(function(user) {
      request(
        'http://api.songkick.com/api/3.0/events/'+id+'.json?apikey=MOgnRVGp6ax4p3IT',
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            var eventData = [];
            if ()
          }
        }
       )

      //db.event.create({id:id,details.....}).then(funcion(event){
      //   user.addEvent(event).then(function(){
        //res.render/redirect/whatever
      // })
      // })
    })
})

app.use('/auth', require('./controllers/auth'));


var searchCtrl = require("./controllers/search.js");
app.use("/", searchCtrl);

var resultCtrl = require('./controllers/result.js');
app.use('/result', resultCtrl);



app.listen(3000);
