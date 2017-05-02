const router = require('express').Router();
const passport = require('../config/passport');
const User = require('../models/user');
const Journel = require('../models/journel');
const sendSms = require('../sendSms');

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
				return user;
			})
			.then(( user ) => {
				sendSms(user.phone, user.firstName)
			})
			.catch( next )
			.error( console.error )

		//Needs to be moved to register incase someone changes there number
		let journel = new Journel();
		journel.accountID = req.user._id;
		journel.save((err, journel) => {
			if( err )
				return res.json({ message: 'There was an error creating the journel' })
			res.redirect('/profile')
		})
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

module.exports = router;
