const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  userName : {type: String ,trim:true },
  productId: {type: String},
  body: {type: String},
  rate: {type: Number},
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
}
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;