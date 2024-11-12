const basketProductModel = require("../../../models/basketProductCartModel");

const addToBasketViewProduct = async(req, res) => {
    try{
        const currentUser = req?.userId;
        const allProduct = await basketProductModel.find({
            userId: currentUser
        }).populate("productId")
        res.json({
            data: allProduct,
            success: true,
            error: false
        })
    }catch(err){
        res.status(400).json({
            message: err?.message,
            error: true,
            success: false
        })
    }
}

module.exports = addToBasketViewProduct