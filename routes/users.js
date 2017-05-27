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
	}))

router.route('/profile')
	.get(helpers.isLoggedIn, (req, res) => {
		Journel.findOne({accountID: req.params.id}, (err, journel) => {
			console.log(journel);
			console.log(req.user);
      if(err)
        res.send(err)
			res.render('profile.hbs', {
				user: req.user,
				journel: journel
			});
    })
	});

module.exports = router;
