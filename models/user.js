const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username   : {type: String ,trim:true },
  password   : {type: String },
  email: {type: String},
});

const User = mongoose.model('User', userSchema);
module.exports = User;