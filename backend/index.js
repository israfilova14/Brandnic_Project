// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const cookieParser = require('cookie-parser');

// const connectDB = require('./config/db.js');
// const app = express();
// const router = require('./routes/index.js');

 
// app.use(cors({
//     origin : process.env.FRONTEND_URL,
//     credentials : true
// }));
 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use("/api", router);
 
// // Server setup
// const PORT = process.env.PORT || 8009;
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("Server is running on port", PORT);
//     });
// });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('../config/db.js');
const router = require('../routes/index.js');
const app = express();

// Ensure JSON parsing middleware is placed before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());
app.use("/api", router);

// Create a serverless function handler
module.exports = (req, res) => {
    connectDB().then(() => {
        app(req, res); // Use Express app for each request in serverless environment
    }).catch((err) => {
        res.status(500).json({ message: 'Database connection failed', error: err });
    });
};

