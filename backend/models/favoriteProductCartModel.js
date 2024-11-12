const mongoose = require('mongoose');

const favoriteProductCartSchema = new mongoose.Schema({
  productId: {
    ref: 'product',
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

const favoriteProductCartModel = mongoose.model("favoriteProduct", favoriteProductCartSchema);
module.exports = favoriteProductCartModel