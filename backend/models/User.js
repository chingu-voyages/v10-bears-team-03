
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  dateCreated: Date,
  UserTrackerGroup:[{ type:Schema.Types.ObjectId, ref:"UserTrackers" }]
});

module.exports = mongoose.model('User', UserSchema);