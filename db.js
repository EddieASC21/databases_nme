const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/nme")
  .then(() => console.log("✅ Connected to MongoDB (nme)"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
