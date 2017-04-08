const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Entry = new Schema({
  date: { type: Date, default: Date.now },
  entry: { type: String, default: null }
});

const Journel = new Schema({
  accountID: String,
  entries: [ Entry ]
});

module.exports = mongoose.model('Journel', Journel);
