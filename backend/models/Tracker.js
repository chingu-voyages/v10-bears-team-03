
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackerSchema = new Schema({
  name: {
      type: String
  },
  type: {
      type: String
  },
  date_purchased: {
      type: Date
  },
  expire: {
      type: Number
  },
  price: {
      type: Number
  },
  where_purchased: {
      type: String
  }

});

module.exports = mongoose.model('Tracker', TrackerSchema);