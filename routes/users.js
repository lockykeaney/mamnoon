const router = require('express').Router();
const passport = require('../config/passport');
const User = require('../models/user');
const Journel = require('../models/journel');
const twilioFunctions = require('../twilioFunctions');
const helpers = require('../helpers');

router.route('/all')
	.get((req, res, next) => {
		User.find()
			.then((list) => {
				res.json(list)
			})
			.catch(next)
			.error(console.error)
	})

router.route('/login')
	.post(passport.authenticate('local-login', {
		successRedirect : '/users/profile',
		failureRedirect : '/',
		failureFlash : true
	}));

router.route('/logout')
	.get((req, res) => {
		req.logout()
		res.redirect('/');
	});

router.route('/register')
	.post(passport.authenticate('local-signup', {
		successRedirect : '/users/profile',
		failureRedirect : '/',
		failureFlash : true
	}));

router.route('/profile')
	.get(helpers.isLoggedIn, (req, res) => {
		res.render('profile.hbs', {
			user: req.user
		});
	});

router.route('/update')
	.post(helpers.isLoggedIn, (req, res, next) => {
		const query = {_id: req.user._id};
		const number = req.body.phone;
		helpers.formatPhoneNumber(number);
		const update = {
			phone: formattedNumber,
			firstName: req.body.first,
			lastName: req.body.last
		};
		const options = {upsert: true, new: true};
		User.findOneAndUpdate(query, update, options)
			.then(( user ) => {
				const code = helpers.authCode()
				twilioFunctions.verify(user.phone, user.firstName, code)
				return code
			})
			.then((code) => {
				console.log('Auth Code: '+ code);
			})
			.catch( next )
			.error( console.error )
	})

module.exports = router;
