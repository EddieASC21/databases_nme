/*
====================================================================================
Simple MongoDB-Backed API using Express and Mongoose
====================================================================================
- This server allows creating users, listing users, and depositing money into user accounts.
- All user data (name, balance, transactions) is stored inside a MongoDB database.
- We perform full CRUD operations via RESTful API endpoints.
====================================================================================
*/

// -----------------------------------------
// 1. SETUP
// -----------------------------------------

const express = require("express");  // Import Express framework
require("./db");                     // Import database connection (Mongoose)
const User = require("./models/User"); // Import Mongoose User model

const app = express();                // Create Express application
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified

// Middleware to parse incoming JSON bodies
app.use(express.json());

// -----------------------------------------
// 2. ROUTES
// -----------------------------------------

/*
  POST /users
  ----------------------------------------------------------------------------------
  - Create a new user.
  - Expects JSON body: { "name": "Eddie" }
  - Creates a new User document in MongoDB with the given name, 
    default balance of 0, and empty transaction history.
*/
app.post("/users", async (req, res) => {
    const { name } = req.body;
    const user = new User({ name });      // Create new user object
    await user.save();                    // Save user to MongoDB
    res.status(201).json(user);            // Respond with created user
});

/*
  GET /users
  ----------------------------------------------------------------------------------
  - Retrieve all users from MongoDB.
  - Returns an array of users, including name, balance, and transactions.
*/
app.get("/users", async (req, res) => {
    const users = await User.find();      // Find all users
    res.json(users);                      // Return users as JSON
});

/*
  POST /deposit
  ----------------------------------------------------------------------------------
  - Deposit money into an existing user's account.
  - Expects JSON body: { "name": "Eddie", "amount": 100 }
  - Finds the user by name, increments their balance, 
    records the deposit transaction, and saves the updated user.
*/
app.post("/deposit", async (req, res) => {
    const { name, amount } = req.body;
    const user = await User.findOne({ name });    // Find user by name

    if (!user) return res.status(404).json({ error: "User not found" }); // Error if not found

    user.balance += amount;                      // Increase user's balance
    user.transactions.push({ type: "deposit", amount }); // Record transaction
    await user.save();                           // Save updated user to database

    res.json({ message: `Deposited $${amount}`, balance: user.balance }); // Response
});

// -----------------------------------------
// 3. START SERVER
// -----------------------------------------

/*
  Start the Express server
  - Listens on the specified port
  - Outputs a message indicating the server URL
*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
