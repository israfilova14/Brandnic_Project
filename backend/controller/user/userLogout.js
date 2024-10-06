async function userLogout(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie("token");
        
        // Send success response
        return res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        console.error("Logout error:", err); // Log the error for debugging
        
        // Send error response
        return res.status(500).json({
            message: "An error occurred during logout",
            error: true,
            success: false
        });
    }
}

module.exports = userLogout;
