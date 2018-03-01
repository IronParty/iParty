const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./Company-types');

const companySchema = new Schema({
  title: {type: String},
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  media: {type: String},
  description: {type: String},
  price: {type: Number},
  email: {type: String},
  schedule: {type: String},
  category: { type: String, enum: TYPES},
  latitude: {type: Number},
  longitude:{type: Number}
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;