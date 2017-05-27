const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const twilioFunctions = require('../twilioFunctions');
const helpers = require('../helpers');
const addToMailchimp = require('../mailchimp');

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
  var name = req.body.name;
  var phone = req.body.phone;
  User.findOne({ 'local.email' :  email }).exec()
    .then((user) => {
      if(user)
        return done(null, false, { message: 'Account already exists with for this email' });

      const newUser = new User()
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);
      newUser.name = name;
      newUser.phone = phone;

      return newUser.save()
        .then(() => {
          const code = helpers.authCode()
          console.log(code);
      		// twilioFunctions.verify(newUser.phone, newUser.name, code)
      		// return code
          addToMailchimp(newUser)
          done(null, newUser)
        })
    })
    .catch((err) => {
      done(err)
    })
}))

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
(req, email, password, done) => {
  User.findOne({ 'local.email' :  email }).exec()
    .then((user) => {
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'))
      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
      return done(null, user)
    })
    .catch((err) => {
      done(err)
    })
}));


module.exports = passport;
