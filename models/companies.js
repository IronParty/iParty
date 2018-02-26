const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  email:    String,
  password: String,
  images: String,
  userName: String
});

const User = mongoose.model('Company', companySchema);

module.exports = User;

