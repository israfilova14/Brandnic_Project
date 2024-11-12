const favoriteProductCartModel = require("../../../models/favoriteProductCartModel");

const addToFavoriteController = async(req, res) => {
   try{
     const {productId} = req.body;
     const currentUser = req.userId;

     if(!currentUser){
        return res.status(401).json({
           message: "User not authenticated",
           success: false,
           error: true
        })
     }

     if(!productId){
        return res.status(400).json({
           message: "Product ID is required",
           success: false,
           error: true
        })
     }

     const isProductFavorite = await favoriteProductCartModel.findOne({productId, userId: currentUser});
     if(isProductFavorite){
        return res.json({
           message: "Product is already in favorites",
           success: false,
           error: true
        })
     }

     const payload = {
       productId,
       userId: currentUser
     }

     const newFavoriteProduct = new favoriteProductCartModel(payload);
     const saveProduct = await newFavoriteProduct.save();

     res.status(201).json({
       data: saveProduct,
       message: "Product added to favorites",
       success: true,
       error: false
     })
   }catch(err){
     console.error("Error adding to favorites", err.message);
     res.status(500).json({
        message: "An error occurred while adding the product to favorites",
        error: true,
        success: false
     })
   }
}

module.exports = addToFavoriteController