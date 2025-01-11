const Contact = require("../models/contactModel");

// Handle form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, mobile, description } = req.body;

    // Create a new contact form entry
    const newContact = new Contact({
      name,
      email,
      mobile,
      description,
    });

    // Save to the database
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
