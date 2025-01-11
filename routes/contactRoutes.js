const express = require("express");
const { submitContactForm } = require("../controllers/contactController");
const router = express.Router();

// Route for submitting the contact form
router.post("/submit", submitContactForm);

module.exports = router;
