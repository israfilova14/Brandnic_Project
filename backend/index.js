const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();

// Ensure JSON parsing middleware is placed before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(cookieParser());
app.use("/api", router);

// Server setup
const PORT = process.env.PORT || 8009;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});

