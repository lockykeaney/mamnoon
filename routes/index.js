const router = require('express').Router();

router.route('/')
	.get((req, res) => {
		// res.json({ message: 'connected to back end'});
		res.render('index.hbs');
	});

router.use('/users', require('./users'));
router.use('/journels', require('./journels'));
router.use('/sms', require('./sms'));

module.exports = router;
