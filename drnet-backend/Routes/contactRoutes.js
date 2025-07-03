const express = require('express');
const router = express.Router();

// ✅ Make sure this file exists: drnet-backend/models/Contact.js
const Contact = require('../models/Contact');

// ✅ Test route
router.get('/test', (req, res) => {
  res.send('📬 Contact route working');
});

// ✅ POST contact message
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log("📥 Incoming Contact Message:", req.body);
    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ message: 'Server error saving contact' });
  }
});

module.exports = router;
