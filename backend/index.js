const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db.js');
const app = express();
const router = require('./routes/index.js');

 
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
 
// Server setup
const PORT = process.env.PORT || 8009;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});

