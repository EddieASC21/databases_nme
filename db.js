/*
====================================================================================
MongoDB Database Connection Setup (db.js)
====================================================================================
- This file connects the backend server to a MongoDB database using Mongoose.
- We load environment variables securely using dotenv.
- It ensures that if the connection succeeds, the server is notified;
  otherwise, the error is caught and displayed in the console.
====================================================================================
*/

// -----------------------------------------
// 1. LOAD ENVIRONMENT VARIABLES
// -----------------------------------------

// Loads variables from a .env file into process.env
// Example: MONGO_URI=your-mongodb-connection-string
require('dotenv').config();

// -----------------------------------------
// 2. SETUP MONGOOSE CONNECTION
// -----------------------------------------

const mongoose = require("mongoose");  // Import Mongoose library

/*
  Connect to MongoDB Atlas cluster or local database
  - Uses the connection URI stored in process.env.MONGO_URI
  - If successful: log success message
  - If error: log error details
*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB (nme)")) // Success: MongoDB is ready
  .catch(err => console.error("❌ MongoDB connection error:", err)); // Failure: log error
