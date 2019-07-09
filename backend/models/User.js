
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  dateCreated: Date
});

module.exports = mongoose.model('User', UserSchema);