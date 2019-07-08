
const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  dateCreated: Date
});

module.exports = mongoose.model('Counter', CounterSchema);