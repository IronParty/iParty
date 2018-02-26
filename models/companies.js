const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CompanySchema = Schema({
  name: String,
  email:    String,
  password: String,
  images: String,
  userName: String
});

const User = mongoose.model('Company', CompanySchema);

module.exports = User;