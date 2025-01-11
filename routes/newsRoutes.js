const express = require("express");
const { addNews, getAllNews, getTodayNews , getSingleNews} = require("../controllers/newsController");
const protect = require("../middleware/authMiddleware");
const News = require("../models/newsModel");
const upload = require("../utils/multer"); 
const router = express.Router();

// Public routes to view news
router.get("/today", getTodayNews);  // Make sure '/today' is first
router.get("/", getAllNews);
router.get("/:id", getSingleNews);  // '/:id' should come after '/today'

// Admin-only route to add news
router.post("/", protect, addNews);

// Admin-only route to add news (including image upload)
router.post("/", protect, upload.single('image'), async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ''; // Store image path in DB

    const newNews = new News({
      title,
      description,
      image, // Save the image path in the DB
      author,
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update News Post
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, author } = req.body;

    // Find the existing news post
    const existingNews = await News.findById(req.params.id);
    if (!existingNews) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update fields
    existingNews.title = title || existingNews.title;
    existingNews.description = description || existingNews.description;
    existingNews.author = author || existingNews.author;

    // Update image only if a new file is uploaded
    if (req.file) {
      existingNews.image = `/uploads/${req.file.filename}`; // Store relative path
    }

    // Save updated document
    const updatedNews = await existingNews.save();
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  
router.delete("/:id", protect, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
