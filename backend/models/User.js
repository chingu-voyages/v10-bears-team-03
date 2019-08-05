const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userFirebaseId: String,
  userEmail: String
});

UserSchema.virtual('userTrackers', {
  ref: 'Tracker',
  localField: 'userFirebaseId',
  foreignField: 'owner'
});

module.exports = mongoose.model('User', UserSchema);
