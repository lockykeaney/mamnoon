const router = require('express').Router();
const User = require('../models/user');
const Journel = require('../models/journel');

router.route('/')
  .post((req, res) => {
    const userNumber = req.body.From;
    const entry = req.body.Body;

    console.log(userNumber);

    User.findOne( { 'phone' : userNumber }, (err, user) => {
      if(err)
        res.send(err)
      if(!user)
        res.json({ message: 'user not found' })
      return theUser = user._id;

    Journel.findOne({ 'accountID': user._id }, (err, doc) => {
      if(err)
        res.send(err)
      return res.json(doc)
      // console.log(doc);
    })

    // const twiml = new twilio.TwimlResponse();
    //
    // twiml.message('The Robots are coming! Head for the hills!');
    //
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
  });
});
module.exports = router;
