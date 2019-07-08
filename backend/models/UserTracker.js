
const mongoose = require('mongoose');

const TrackerSchema = new mongoose.Schema({
  tracker_id: Number,
  user_id: Number,
  distance_used: Number
});

module.exports = mongoose.model('Tracker', TrackerSchema);