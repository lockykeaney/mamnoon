const router = require('express').Router();
const passport = require('../config/passport');
const User = require('../models/user');

router.route('/login')
	.post(passport.authenticate('local-login', {
		successRedirect : '/users/profile',
		failureRedirect : '/',
		failureFlash : true
	}));

router.route('/logout')
	.get((req, res) => {
		req.logout();
		res.redirect('/');
	});

router.route('/register')
	.post(passport.authenticate('local-signup', {
		successRedirect : '/users/profile',
		failureRedirect : '/',
		failureFlash : true
	}));

router.route('/profile')
	.get(isLoggedIn, (req, res) => {
		res.render('profile.hbs', {
			user: req.user
		});
	});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;
