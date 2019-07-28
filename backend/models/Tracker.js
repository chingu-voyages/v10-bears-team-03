
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TrackerSchema = new Schema({
  name: String,
  type: String,
  date_purchased: Date,
  expire: Number,
  price:  Number,
  where_purchased: String,
  UserTrackerGroup: [{ type:Schema.Types.ObjectId, ref:"UserTrackers" }]

});

module.exports = mongoose.model('Tracker', TrackerSchema);