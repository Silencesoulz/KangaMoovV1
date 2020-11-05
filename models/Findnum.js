const mongoose = require('mongoose');

const FindnumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Findnum = mongoose.model('Findnum', FindnumSchema);

module.exports = Findnum;