const express = require("express");
require("./db"); // connect to MongoDB
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST /users
app.post("/users", async (req, res) => {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  });
  
  // GET /users
  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  
  // POST /deposit
  app.post("/deposit", async (req, res) => {
    const { name, amount } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: "User not found" });
  
    user.balance += amount;
    user.transactions.push({ type: "deposit", amount });
    await user.save();
  
    res.json({ message: `Deposited $${amount}`, balance: user.balance });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  