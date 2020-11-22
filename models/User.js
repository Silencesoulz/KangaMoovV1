const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  firstnum: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  line: {
    type: String,
    required: true
  }
});

const user = mongoose.model('user', UserSchema);

module.exports = user;

