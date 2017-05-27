const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP)
const listUniqueId = 'ef3857ae89'

function addToMailchimp(user) {

  const nameSplit = user.name.split(" ")
  mailchimp.post('/lists/' + listUniqueId + '/members/', {
    'email_address': user.local.email,
    'status': 'subscribed',
    'merge_fields': {
      'FNAME': nameSplit[0],
      'LNAME': nameSplit[1]
    }
  })
  .then((results) => {
    console.log('Added user to subscriber list');
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  })

}

module.exports = addToMailchimp;
