const router = require('express').Router();
const User = require('../models/user');
const Journel = require('../models/journel');
const twilio = require('twilio');
const twiml = new twilio.TwimlResponse();
const twilioFunctions = require('../twilioFunctions');

router.route('/')
  .get((req, res) => {
    res.json({ message: 'sms routes'})
  })
  .post((req, res, next) => {
    const userNumber = req.body.From;
    User.findOne({ 'phone': userNumber })
      .then((user) => {
        return user
        next()
      })
      .then((user) => {
        Journel.findOne({ 'accountID': user._id })
          .then((journel) => {
            if( journel === null ) {
              console.log('creating new journel')
              let newJournel = new Journel({ accountID: user._id })
              newJournel.save((err, newJournel) => {
                if( err ) { console.log(err) }
                console.log('New journel created')
                //Send response message
                twiml.message('Thank you'+user.firstName+', your own personal gratitude journel has been set up. Save this number and send a quick text whenever you are feeling grateful for something!');
                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
              })
            } else {
              let query = {accountID: user._id};
              let entry = { $push: { "entries": {date: new Date(), entry: req.body.Body} }};
              let options = { safe: true, upsert: true, new : true };
              Journel.findOneAndUpdate(query, entry, options, (err, journel) => {
                if(err) console.log(err)
                return console.log(journel)
            })
          }
        })
      })
})

module.exports = router;
