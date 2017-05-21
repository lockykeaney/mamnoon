// Twilio Credentials
const accountSid = 'ACe3df74c2e1c3d181fbfc846f1cddc21c';
const authToken = '06e17809246451b39ac4bfa99623a7c6';
const twilioNumber = '+61437896492';
const client = require('twilio')(accountSid, authToken);

const twilioFunctions = {
  verify: function(phone, name, authCode) {
    client.messages
      .create({
        to: phone,
        from: twilioNumber,
        body: 'Hey ' +name+ ', welcome to Mamnoon! I am your personal Gratitude helper. Enter '+authCode+' to verify your phone number and create your Journel',
      })
      .then((message) => console.log(message.sid+" sent to: "+message.to));
  },
  confirm: function(phone, name) {
    console.log(phone, name);
    client.messages
      .create({
        to: phone,
        from: twilioNumber,
        body: 'Thank you ' +name+ ', I have just created you your own personal journel, save this number and just send me a message whenever you have something you are grateful for!',
      })
      .then((message) => console.log(message.sid+" sent to: "+message.to));
  }
}

module.exports = twilioFunctions;
