const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  userName   : {type: String ,trim:true },
  password   : {type: String },
  email: {type: String},
  googleID:String,
  facebookID:String
});

const User = mongoose.model('User', userSchema);
module.exports = User;