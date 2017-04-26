const router = require('express').Router();
const User = require('../models/user');
const Journel = require('../models/journel');

function getUserId(phone) {
  const result = User.findOne( { 'phone' : phone }, (err, user) => {
    if(err)
      res.send(err);
    if(!user)
      res.json({ message: 'user not found' });
    res.json(user)
  } );
  return result;
}

router.route('/')
  .post((req, res) => {
    const userNumber = req.body.From;
    const entry = req.body.Body;

    console.log(userNumber);
    const match = getUserId(userNumber);
    console.log(match);
    match.exec(function(err, user) {
      if(err)
        return console.log(err);
      return(user);
    });
    // const twiml = new twilio.TwimlResponse();
    //
    // twiml.message('The Robots are coming! Head for the hills!');
    //
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
  });

module.exports = router;
