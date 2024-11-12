const favoriteProductCartModel = require("../../../models/favoriteProductCartModel");

const addToFavoriteViewProduct = async (req, res) => {
   try{
      const currentUser = req?.userId;
      const allFavoriteProducts = await favoriteProductCartModel.find({
         userId: currentUser
      }).populate("productId");

      res.json({
        data: allFavoriteProducts,
        success: true,
        error: false
      })
   }catch(err){
      console.error("Error retrieving favorite products:", err.message);
      res.status(400).json({
         message: err?.message,
         error: true,
         success: false
      })
   }
}

module.exports = addToFavoriteViewProduct