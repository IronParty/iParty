const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username   : {type: String ,trim:true },
  password   : {type: String },
  email: {type: String},
  googleID:{type: String},
  facebookID: {type: String},
  location: {type: {type: String},coordinates:{type: [Number], default:[19.3978285, -99.1729289]}
}
});

const User = mongoose.model('User', userSchema);
module.exports = User;