const mongoose = require('mongoose');

const basketCartSchema = new mongoose.Schema({
   productId: {
        ref: 'product',
        type: String,
   },
   quantity: Number,
   userId: String
},{
    timeStamps: true
})

const basketProductCartModel = mongoose.model("addToBasket", basketCartSchema);
module.exports = basketProductCartModel;