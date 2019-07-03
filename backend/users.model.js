const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Users = new Schema({
    Users_name: {
        type: String
    },
    Users_username: {
        type: String
    }
});
module.exports = mongoose.model('Users', Users);