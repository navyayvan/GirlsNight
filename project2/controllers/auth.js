// router.post('/login', function(req, res) {
//   var email = req.body.email;
//   var password = req.body.password;
//   db.user.authenticate(email, password, function(err, user) {
//     if (err) {
//       res.send(err);
//     } else if (user) {
//       req.session.userId = user.id;
//       res.redirect('/');
//     } else {
//       res.send('user and/or password invalid');
//     }
//   });
// });


// router.get('/logout', function(req, res) {
//   req.session.userId = false;
//   res.redirect('/');
// });