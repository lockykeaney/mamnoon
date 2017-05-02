const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
(req, email, password, done) => {
  User.findOne({ 'local.email' :  email }).exec()
    .then((user) => {
      if(user) {
        return done(null, false, { message: 'Account already exists with for this email' });
      } else {
        const newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        return newUser.save()
          .then(() => {
            console.log(newUser);
            done(null, newUser);
          })
      }
    })
    .catch((err) => {
      done(err);
    })
}))



passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {
  User.findOne({ 'local.email' :  email }, function(err, user) {
    if (err)
      return done(err);
    if (!user)
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    if (!user.validPassword(password))
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    return done(null, user);
    });
}));


module.exports = passport;
