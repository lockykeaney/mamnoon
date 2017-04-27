// Twilio Credentials
const accountSid = 'ACe3df74c2e1c3d181fbfc846f1cddc21c';
const authToken = '06e17809246451b39ac4bfa99623a7c6';
const twilioNumber = '+61437896492';

const client = require('twilio')(accountSid, authToken);

module.exports = function(phone, name) {
  client.messages
    .create({
      to: phone,
      from: '+61437896492',
      body: 'Hey ' +name+ ', welcome to Mamnoon! I am your personal Gratitude helper. Save my number into your phone, and send me a text whenever you are feeling grateful. I will also contact to remind you when it is good to be grateful.',
    })
    .then((message) => console.log(message.sid));
}
