// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
const twilioNumber = '+61437896492';
const sendTo = '+61439071854';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: sendTo,
    from: twilioNumber,
    body: 'Hey [user], welcome to Mamnoon! I am your personal Gratitude helper. Save my number into your phone, and send me a text whenever you are feeling grateful. I will also contact to remind you when it is good to be grateful.',
  })
  .then((message) => console.log(message.sid));

module.exports = client;
