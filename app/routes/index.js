const router = require('express').Router();

router.route('/')
	.get((req, res) => {
		// res.json({ message: 'connected to back end'});
		res.render('index.hbs');
	});

router.use('/users', require('./users'));

module.exports = router;
