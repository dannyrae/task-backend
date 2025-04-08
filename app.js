const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
      origin: "*"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user-api")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/api", userRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Internal Server Error",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
