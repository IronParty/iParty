const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./Company-types');

const companySchema = new Schema({
  title: {type: String},
  owner: {type: String},
  media: [{type: String}],
  description: {type: String},
  price: {type: Number},
  email: {type: String},
  schedule: {type: String},
  category: { type: String, enum: TYPES},
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;