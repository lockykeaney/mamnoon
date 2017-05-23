// Twilio Credentials
const accountSid = 'ACe3df74c2e1c3d181fbfc846f1cddc21c';
const authToken = '06e17809246451b39ac4bfa99623a7c6';
const twilioNumber = '+61437896492';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+61416556563',
    from: twilioNumber,
    body: 'Testing Twilio',
  })
  .then((message) => console.log(message.sid+" sent to: "+message.to));
