const addToCartModel = require("../../models/productCartModel");

const updateAddToCartProductController = async(req, res) => {
    try {
        const currentUserId = req?.userId;
        const addToCartProductId = req.body?._id; // The product ID
        const qty = req.body.quantity;

        console.log("Updating product ID:", addToCartProductId, "for user ID:", currentUserId);

        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { $set: { quantity: qty } }
        );

        if (updateProduct.matchedCount === 0) {
            return res.status(404).json({ message: 'Product not found or quantity not modified', error: true, success: false });
        }

        res.json({
            message: "Product updated",
            data: updateProduct,
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err?.message,
            success: false,
            error: true
        });
    }
}

module.exports = updateAddToCartProductController