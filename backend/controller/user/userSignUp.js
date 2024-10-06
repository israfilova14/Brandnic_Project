const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { name, email, password, role , profilePic} = req.body;
         
        const user = await userModel.findOne({email});
        if(user){
            throw new Error("Already user exsists")
        }
        // Validate required fields
        if (!name) {
            throw new Error("Please provide name");
        }
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        // Hash the password
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Check if hashing was successful
        if (!hashPassword) {
            throw new Error("Something went wrong with hashing the password");
        }

        // Create user data payload with hashed password
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword,
        };

        // Save user to the database
        const userData = new userModel(payload);
        const saveUser = await userData.save();  // Add `await` here

        // Respond with success message
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!",
        });
    } catch (err) {
        // Send error response
        res.status(500).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
