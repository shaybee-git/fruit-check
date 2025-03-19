const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
  try {
    console.log("Received data:", req.body); // ✅ Debugging line

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration Error:", error);  // ✅ Log the full error
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
