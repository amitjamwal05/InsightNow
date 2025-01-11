const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require('path');
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route Handlers
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Catch-all Route for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handling Middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
