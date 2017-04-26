const router = require('express').Router();
const User = require('../models/user');
const Journel = require('../models/journel');

router.route('/')
  .post((req, res) => {
    // console.log(req.body.From);
    const userNumber = req.body.From;
    const entry = req.body.Body;
    console.log(userNumber, entry);

    User.findOne( { 'phone' : userNumber }, (err, user) => {
      if(err)
        res.send(err)
      if(!user)
        res.json({ message: 'that number is not recognized' })
      res.json(user)
      const userId = user._id;
      console.log(userId);
      // Journel.findById(userId, (err, doc) => {
      //   if(err)
      //     res.send(err)
      //   res.json(doc)
      // })
    })
    // const twiml = new twilio.TwimlResponse();
    //
    // twiml.message('The Robots are coming! Head for the hills!');
    //
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
  });

module.exports = router;
