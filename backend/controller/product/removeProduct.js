const productModel = require("../../models/productModel");

async function removeProductController(req, res) {
    try{
       const productId = req.body._id;
       const deleteProduct = await productModel.findByIdAndDelete({_id: productId});
       if(!deleteProduct){
         return res.status(400).json({
           message: "Product not found",
           error: true,
           success: false
         })
       }
       res.json({
         message: "Product deleted successfully",
         success: true,
         error: false,
         data: deleteProduct
       })
    }
    catch(err){
       res.status(500).json({
          message: err?.message || 'An error occured while deleting product',
          error: true,
          success: false
       })
    }
}

module.exports = removeProductController