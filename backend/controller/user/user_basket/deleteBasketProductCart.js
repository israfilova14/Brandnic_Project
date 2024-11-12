const basketProductModel = require("../../../models/basketProductCartModel");

const deleteBasketProductCart = async(req, res) => {
    try{
      const currentUserId = req?.userId;
      const addToCartProductId = req.body._id;

      const deleteProduct = await basketProductModel.deleteOne({
        _id: addToCartProductId
      })

      res.json({
        message: "Product deleted from your basket",
        error: false,
        success: true,
        data: deleteProduct
      })
    }catch(err){
      res.status(400).json({
        message: err?.message,
        success: false,
        error: true
      })
    }
}

module.exports = deleteBasketProductCart