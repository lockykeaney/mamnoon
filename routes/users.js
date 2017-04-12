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
		console.log(req.user);
	});

router.route('/update')
	.post(isLoggedIn, (req, res) => {
		let query = {_id: req.user._id};
		let update = {phone: req.body.phone};
		let options = {upsert: true, new: true};
			User.findOneAndUpdate(query, update, options, (err, user) => {
				if(err) return res.send(500, {error: err});
				return res.send(user);
			})
			console.log(req.user);
			console.log(req.body);
		})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;
