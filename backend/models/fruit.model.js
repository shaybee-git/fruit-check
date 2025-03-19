const mongoose = require("mongoose");

const FruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ripeness: { type: String, required: true },
  confidence: { type: Number, required: true },
  checkedOn: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Fruit", FruitSchema);
