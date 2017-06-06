const helpers = {

  isLoggedIn: function(req, res, next) {
    if(req.isAuthenticated())
      return next();
    res.render('index');
  },
  formatPhoneNumber: function(number) {
    if(number.charAt() === "0") {
      const subString = number.substr(1);
      return formattedNumber = "+61"+subString;
    }
  },
  authCode: function() {
    const code = Math.floor(1000 + Math.random() * 9999);
    return code;
  },
  authCheck: function(localCode, postCode) {
    if(localCode === postCode) {
      //user.verified = true
    } else {
      //run function to resend verifu code
    }
   }

}

module.exports = helpers;
