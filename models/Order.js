const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  usernameId : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  timestamps: { 
    createdAt: "created_at", 
    updatedAt: "updated_at" 
}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;