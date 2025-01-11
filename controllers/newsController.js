const News = require("../models/newsModel");

// Add News
exports.addNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All News
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Today's News
exports.getTodayNews = async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  try {
    const news = await News.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Single News Post by ID
exports.getSingleNews = async (req, res) => {
  console.log("Received ID:", req.params.id);
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News post not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

