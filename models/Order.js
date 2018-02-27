const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  userName : {type: String},
  productId: {type: String},
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;