const router = require('express').Router();
const helpers = require('../helpers');

router.route('/')
	.get(helpers.isLoggedIn, (req, res) => {
		res.redirect('/users/profile');
	})

router.use('/users', require('./users'));
router.use('/journels', require('./journels'));
router.use('/sms', require('./sms'));

module.exports = router;
