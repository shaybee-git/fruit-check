const express = require("express");
const Fruit = require("../models/fruit.model.js");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Save fruit data (Ensures logged-in user is storing data)
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { name, ripeness, confidence, checkedOn } = req.body;
    const userId = req.user.id; // Get user ID from JWT token

    if (!name || !ripeness || !confidence || !checkedOn) {
      return res.status(400).json({ error: "All fields are required (name, ripeness, confidence, checkedOn)" });
    }

    const newFruit = new Fruit({
      name,
      ripeness,
      confidence,
      checkedOn,
      user: userId, // Link fruit to logged-in user
    });

    await newFruit.save();
    res.status(201).json({ message: "Fruit saved successfully", fruit: newFruit });
  } catch (error) {
    console.error("Error saving fruit:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get fruit history for logged-in user
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT token
    const history = await Fruit.find({ user: userId }).sort({ checkedOn: -1 });

    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
