const addToCartModel = require("../../models/productCartModel");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;

        // Ensure the userId is available
        const currentUser = req.userId;
        if (!currentUser) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
                error: true
            });
        }

        // Validate productId
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
                error: true
            });
        }

        // Check if the product is already in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });
        console.log("isProductAvailable", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in Cart",
                success: false,
                error: true
            });
        }

        // Prepare the payload for adding a new product to the cart
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        };

        // Create and save the new product in the cart
        const newAddToCart = new addToCartModel(payload);
        const savedProduct = await newAddToCart.save();

        res.status(201).json({
            data: savedProduct,
            message: "Product added to the Cart",
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error adding to cart:", err.message); // Log the error for debugging
        res.status(500).json({
            message: "An error occurred while adding the product to the cart",
            error: true,
            success: false
        });
    }
}

module.exports = addToCartController;
