const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  phone: {
    type: String,
    default: null
  },
  firstName: String,
  lastName: String,
  local: {
    email: String,
    password: String,
  },
  journelId: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
