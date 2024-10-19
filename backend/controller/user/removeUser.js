const userModel = require("../../models/userModel");

async function removeUserController(req, res) {
   try{
      const userId = req.body._id;

      const deleteUser = await userModel.findByIdAndDelete({_id: userId});
      if(!deleteUser){
         return res.status(400).json({
           message: "User not found",
           error: true,
           success: false
         })
      }

      res.json({
         message: "User deleted successfully",
         success: true,
         error: false,
         data: deleteUser
      })
   }catch(err){
      res.status(500).json({
         message: err?.message || 'An error occurred while deleting user',
         error: true,
         success: false
      })
   }
}
module.exports = removeUserController