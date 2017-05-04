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

    console.log(userNumber);
    console.log(entry);

    User.findOne({ 'phone' : userNumber })
      .then((user) => {
        console.log( user );
        if( user.journelId === null || 'undefined' ) {
          console.log('no journel');
          twiml.message('No journel');
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
          
          const journel = new Journel();
          user.journelId = journel._id;
          journel.save(journel)
            .then((journel) => {
              res.json(journel)
            })
          }
        })
      .then((user) => {
        return user;
        console.log('update journel', user);
      })
      .catch(next)
      .error(console.error)


    // Journel.findOne({ 'accountID': user._id })
    //   .then((doc) => {
    //     res.json(doc)
    //   })
    //   .catch(next)
    //   .error(console.error)




  });

module.exports = router;
