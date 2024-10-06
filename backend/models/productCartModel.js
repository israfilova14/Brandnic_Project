const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   productId: {
        ref: 'product',
        type: String,
   },
   quantity: Number,
   userId: String
},{
    timeStamps: true
})

const addToCartModel = mongoose.model("addToCart", cartSchema);
module.exports = addToCartModel;