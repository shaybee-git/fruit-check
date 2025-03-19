require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fruitRoutes = require("./routes/fruit.route");
const authRoutes = require("./routes/auth.route");

const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);  // ✅ Authentication Routes
app.use("/api/fruit", fruitRoutes); // ✅ Fruit Routes
app.use("/uploads", express.static("uploads")); // ✅ Serve uploaded images

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
