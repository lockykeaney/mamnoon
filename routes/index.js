const router = require('express').Router();

router.route('/')
	.get((req, res) => {
		// if(req.isAuthenticated())
		// 	res.redirect('/users/profile');
		res.render('index');
	})

router.use('/users', require('./users'));
router.use('/journels', require('./journels'));
router.use('/sms', require('./sms'));

module.exports = router;
