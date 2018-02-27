const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username   : {type: String ,trim:true },
  password   : {type: String },
  email: {type: String},
  cart: {type: String},
  picPath: {type: String},
  rol:{type: String},
  googleID:String
});

const User = mongoose.model('User', userSchema);
module.exports = User;