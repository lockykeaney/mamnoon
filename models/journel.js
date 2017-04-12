const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Journel = new Schema({
  accountID: {
    type: String,
    default: null
  },
  entries: [
    {
      date: { type: Date, default: Date.now },
      entry: { type: String, default: null }
    }
  ]
});

module.exports = mongoose.model('Journel', Journel);
