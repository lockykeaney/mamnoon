const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp('f556e02aa6b18fb6d564a1ff6138e55a-us16')
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
  })
  .catch((err) => {
    console.log(err);
  })

}

module.exports = addToMailchimp;
