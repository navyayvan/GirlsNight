var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup', {alerts: req.flash()});
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      req.flash('success', 'User created!');
      res.redirect('/');
    } else {
      req.flash('danger', 'That email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(err) {
    req.flash('danger', 'Error:', err.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login', {alerts: req.flash()});
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  db.user.authenticate(email, password, function(err, user) {
    if (err) {
      req.flash('danger', 'Error:', err.message);
      res.redirect('/auth/login');
    } else if (user) {
      req.session.userId = user.id;
      req.flash('success', 'You are logged in!');
      res.redirect('/');
    } else {
      req.flash('danger', 'Email and/or password invalid');
      res.redirect('/auth/login');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.userId = false;
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;