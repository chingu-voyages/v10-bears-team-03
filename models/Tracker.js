
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TrackerSchema = new Schema({
  name: String,
  type: String,
  expire: Number,
  price:  Number,
  UserTrackerGroup: [{ type:Schema.Types.ObjectId, ref:"UserTrackers" }]

});

module.exports = mongoose.model('Tracker', TrackerSchema);