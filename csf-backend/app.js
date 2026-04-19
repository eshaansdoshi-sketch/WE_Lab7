const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // Allows JSON parsing
app.use(
  cors({
    origin: ["http://localhost", "http://localhost:8080", "https://www.amazon.com"], // Allow requests from this origin
  }),
); // Enables cross-origin requests

app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const todoRoutes = require("./routes/todoRoutes");
app.use("/api", todoRoutes);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do API");
});

app.get("/welcome", (req, res) => {
  res.send("Welcome to the To-Do API");
});

app.get("/welcome/:name", (req, res) => {
  res.send(`Welcome to the To-Do API - Special Route, ${req.params.name}!`);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
