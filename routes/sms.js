const router = require('express').Router();
const User = require('../models/user');
const Journel = require('../models/journel');
const twilio = require('twilio');
const twiml = new twilio.TwimlResponse();


function checkJournelStatus(phone) {

}
function createJournel() {

}
function addJournelEntry() {

}

router.route('/')
  .get((req, res) => {
    res.json({ message: 'sms routes'})
  })
  .post((req, res, next) => {
    const userNumber = req.body.From;
    const entry = req.body.Body;
    //Check the user collection for the phone number
    User.findOne({ 'phone': userNumber })
      .then((user) => {
        //if the user is found, return user object
        return user;
        next();
      }, (err) => {
        //if user is not found, throw error
        console.log(err);
      })
      .then((user) => {
        Journel.findOne({ 'accountID': user._id })
          .then((journel) => {
            console.log(journel);
            next();
          }, (err) => {
            console.log(err);
          })
      })
    //then check to see if journel has accountID === to user id
    //if not, create a new journel
    //if found, update with the new entry

    // User.findOne( { 'phone' : userNumber }, (err, user) => {
    //   if(err)
    //     res.send(err)
    //   if(!user)
    //     res.json({ message: 'user not found' })
    //   return res.json(user);

    // return console.log(theUser);

    // Journel.findOne({ 'accountID': theUser }, (err, doc) => {
    //   if(err)
    //     res.send(err)
    //   return res.json(doc)
    //   // console.log(doc);
    // })

    // const twiml = new twilio.TwimlResponse();
    //
    // twiml.message('The Robots are coming! Head for the hills!');
    //
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
  // });
});

module.exports = router;
