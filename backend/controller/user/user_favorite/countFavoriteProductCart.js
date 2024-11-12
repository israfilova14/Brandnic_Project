const favoriteProductCartModel = require("../../../models/favoriteProductCartModel");

const countFavoriteProduct = async(req, res) => {
   try{
     const userId = req?.userId;
     const count = await favoriteProductCartModel.countDocuments({
       userId: userId
     });
     res.json({
       data: {
        count: count
       },
       message: "Ok",
       success: true,
       error: false
     })
   }
   catch(err) {
     res.status(400).json({
       message: err?.message,
       error: true,
       success: false
     })
   }
}

module.exports = countFavoriteProduct