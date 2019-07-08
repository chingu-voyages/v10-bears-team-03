
const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
  name: String,
  type: String,
  date_purchased: Date,
  expire: Number,
  price: Number,
  where_purchased: String
});

module.exports = mongoose.model('Tracker', TrackerSchema);