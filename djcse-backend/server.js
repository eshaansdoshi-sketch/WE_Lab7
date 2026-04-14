require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes (IMPORTANT: correct file name)
const todoRoutes = require("./routes/todoRoutes");
app.use("/api", todoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
