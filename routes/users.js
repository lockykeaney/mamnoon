const router = require('express').Router();
const passport = require('../config/passport');
const User = require('../models/user');
const Journel = require('../models/journel');

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

router.route('/update')
	.post(isLoggedIn, (req, res) => {
		let query = {_id: req.user._id};
		let update = {phone: req.body.phone};
		let options = {upsert: true, new: true};
			User.findOneAndUpdate(query, update, options, (err, user) => {
				if(err) return res.send(500, {error: err});
				return res.send(user);
			})
			//Needs to be moved to register incase someone changes there number
			let journel = new Journel();
			journel.accountID = req.user._id;
			journel.save((err, journel) => {
				if( err )
					return res.json({ message: 'There was an error creating the journel' })
				res.redirect('/profile')
			})
		})

//Potentail jsut add the success redirect to the register route
// router.route('/create-journel')
// 	.post((req,res) => {
// 		let journel = new Journel();
// 		journel.accountID = req.user._id;
// 		journel.save((err, journel) => {
// 			if( err )
// 				return res.json({ message: 'There was an error creating the journel' })
// 			res.redirect('/profile')
// 		})
// 	})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}


module.exports = router;
