const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  title: {type: String},
  description: {type: String},
  images: [{type: String}],
  owner: {type: String},
  price: {type: String},
  phone: {type: String},
  schedule: {type: String},
  reviews: [{type: String}]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;

