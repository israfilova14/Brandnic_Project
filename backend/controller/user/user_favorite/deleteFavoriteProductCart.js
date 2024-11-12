const favoriteProductCartModel = require("../../../models/favoriteProductCartModel");

const deleteFavoriteProductCart = async(req, res) => {
   try{
     const currentUserId = req?.userId;
     const favoriteProductId = req.body._id;

     if(!currentUserId){
        return res.status(401).json({
           message: "User not authenticated",
           error: true,
           success: false
        })
     }

     const deleteProduct = await favoriteProductCartModel.deleteOne({
       _id: favoriteProductId,
       userId: currentUserId
     })

     if(deleteProduct.deletedCount === 0){
       return res.status(404).json({
          message: "Favorite product not found or already deleted",
          error: true,
          success: false
       })
     }

     res.json({
        message: "Product deleted from your favorites",
        error: false, 
        success: true,
        data: deleteProduct
     })
   }catch(err){
      console.error("Error deleting favorites product", err.message);
      res.status(400).json({
          message: err?.message,
          success: false,
          error: true
      })
   }
}

module.exports = deleteFavoriteProductCart