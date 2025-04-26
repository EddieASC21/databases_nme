/*
====================================================================================
User Model Definition (models/User.js)
====================================================================================
- Defines the structure (schema) of User documents that will be stored in MongoDB.
- A User has:
    - A name
    - A balance
    - A list of transactions (each deposit/withdrawal recorded with type, amount, and date)
- This model is created using Mongoose and is exported for use in API routes.
====================================================================================
*/

// -----------------------------------------
// 1. IMPORT MONGOOSE
// -----------------------------------------

const mongoose = require("mongoose");  // Import Mongoose library

// -----------------------------------------
// 2. DEFINE SUBDOCUMENT: Transaction Schema
// -----------------------------------------

/*
  Transaction Schema
  - Represents a single transaction (deposit or withdrawal)
  - Fields:
      - type: "deposit" or "withdrawal"
      - amount: Number (positive value)
      - date: Timestamp (defaults to now if not provided)
*/
const transactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

// -----------------------------------------
// 3. DEFINE MAIN DOCUMENT: User Schema
// -----------------------------------------

/*
  User Schema
  - Represents a user of the banking system
  - Fields:
      - name: User's name (String)
      - balance: User's account balance (Number, default = 0)
      - transactions: Array of transactions (each following the transactionSchema)
*/
const userSchema = new mongoose.Schema({
  name: String,
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema] // Embeds an array of transaction subdocuments
});

// -----------------------------------------
// 4. EXPORT MODEL
// -----------------------------------------

/*
  Exports the User model
  - Model name: "User"
  - Collection name in MongoDB: automatically pluralized to "users"
  - Allows us to perform CRUD operations on users in our database
*/
module.exports = mongoose.model("User", userSchema);
