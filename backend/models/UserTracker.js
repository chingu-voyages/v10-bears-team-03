
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTrackerSchema = new mongoose.Schema({
  tracker_id:{ type:Schema.Types.ObjectId, ref:"TrackerID"},
  user_id:{ type:Schema.Types.ObjectId, ref:"UserID"},
  distance_used: Number
});

module.exports = mongoose.model('UserTracker', UserTrackerSchema);