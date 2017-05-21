const router = require('express').Router();
const passport = require('../config/passport');
const User = require('../models/user');
const Journel = require('../models/journel');
const verifyPhone = require('../verifyPhone');

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
	.get(isLoggedIn, (req, res) => {
		res.render('profile.hbs', {
			user: req.user,
			state: req.session.state
		});
	});

router.route('/update')
	.post(isLoggedIn, (req, res, next) => {
		const query = {_id: req.user._id};
		const number = req.body.phone;
		formatPhoneNumber(number);
		const update = {
			phone: formattedNumber,
			firstName: req.body.first,
			lastName: req.body.last
		};
		const options = {upsert: true, new: true};

		User.findOneAndUpdate(query, update, options)
			.then(( user ) => {
				const code = authCode()
				verifyPhone(user.phone, user.firstName, code)
				return code
			})
			.then((code) => {
				console.log('Auth Code: '+ code);
			})
			.catch( next )
			.error( console.error )
	})

router.route('/verify')
	.post(isLoggedIn, (req, res, next) => {
		const query = {_id: req.user._id};
		const update = {verified: true};
		const options = {upsert: true, new: true};

		User.findOneAndUpdate(query, update, options)
			.then(( user ) => {
				const code = authCode()
				verifyPhone(user.phone, user.firstName, code)
				return code
			})
			.then((code) => {
				console.log('Auth Code: '+ code);
			})
			.catch( next )
			.error( console.error )
	})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}

function formatPhoneNumber(number) {
	if(number.charAt() === "0") {
		const subString = number.substr(1);
		return formattedNumber = "+61"+subString;
	}
}

function authCode() {
	const code = Math.floor(1000 + Math.random() * 9999);
	return code;
}

function authCheck(localCode, postCode) {
	if(localCode === postCode) {
		//user.verified = true
	} else {
		//run function to resend verifu code
	}
 }

module.exports = router;
