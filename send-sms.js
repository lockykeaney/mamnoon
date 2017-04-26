// Twilio Credentials
const accountSid = 'ACe3df74c2e1c3d181fbfc846f1cddc21c';
const authToken = '06e17809246451b39ac4bfa99623a7c6';
const twilioNumber = '+61437896492';
const sendTo = '0439071854';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: sendTo,
    from: twilioNumber,
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  })
  .then((message) => console.log(message.sid));
