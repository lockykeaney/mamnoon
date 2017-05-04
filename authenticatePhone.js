// Twilio Credentials
const accountSid = 'ACe3df74c2e1c3d181fbfc846f1cddc21c';
const authToken = '06e17809246451b39ac4bfa99623a7c6';
const twilioNumber = '+61437896492';

const client = require('twilio')(accountSid, authToken);


module.exports = function(phone, name, authCode) {

  client.messages
    .create({
      to: phone,
      from: twilioNumber,
      body: 'Hey ' +name+ ', welcome to Mamnoon! I am your personal Gratitude helper. Enter '+authCode+' to verify your phone number and create your Journel',
    })
    .then((message) => console.log(message.sid+" sent to: "+message.to));

}
