const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  title: {type: String},
  owner: {type: String},
  media: [{type: String}],
  description: {type: String},
  price: {type: Number},
  phone: {type: Number},
  schedule: {type: String},
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;

