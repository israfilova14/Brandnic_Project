const orderProductModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrdersController = async(req, res) => {
   const userId = req?.userId;

   const user = await userModel.findById(userId);
   if(user.role !== 'ADMIN'){
       return res.status(500).json({
         message: "not access"
       })
   }

   const allOrders = await orderProductModel.find().sort({createdAt: -1});

   return res.status(200).json({
      data: allOrders,
      success: true
   })
}

module.exports = allOrdersController