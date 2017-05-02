const router = require('express').Router();
const User = require('../models/user');
const Journel = require('../models/journel');

//Needs to be moved to register incase someone changes there number
// let journel = new Journel();
// journel.accountID = req.user._id;
// journel.save((err, journel) => {
//   if( err )
//     return res.json({ message: 'There was an error creating the journel' })
//   res.redirect('/profile')
// })

router.route('/')
  .get((req, res) => {
    res.json({ message: 'sms routes'})
  })
  .post((req, res, next) => {
    console.log(req.body);
    const userNumber = req.body.From;
    const entry = req.body.Body;

    console.log(userNumber);
    console.log(entry);

    // User.findOne({ 'phone' : userNumber })
    //   .then((user) => {
    //     if( user.accountID === null || 'undefined' ) {
    //       console.log('creating account');
    //     } else {
    //       return user;
    //     }
    //   })
    //   .then((user) => {
    //     return user;
    //     console.log('update journel', user);
    //   })
    //   .catch(next)
    //   .error(console.error)

    // Journel.findOne({ 'accountID': user._id })
    //   .then((doc) => {
    //     res.json(doc)
    //   })
    //   .catch(next)
    //   .error(console.error)

    // const twiml = new twilio.TwimlResponse();
    //
    // twiml.message('The Robots are coming! Head for the hills!');
    //
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
  });
// });
module.exports = router;
