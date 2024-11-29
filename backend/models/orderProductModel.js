const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productDetails: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: [String],
    },
  ],
  email: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentDetails: {
    paymentId: { type: String, required: true },
    payment_method: { type: String },
    payment_status: { type: String, required: true },
  },
  shipping_options: [
    {
      id: String,
      shipping_amount: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
