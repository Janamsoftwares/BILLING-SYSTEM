const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Test Route
router.get('/test', (req, res) => {
  res.send('✅ Booking route working');
});

// ✅ Create Booking
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      location,
      exactLocation,
      package: selectedPackage,
      extraNotes
    } = req.body;

    if (!name || !phone || !location || !exactLocation || !selectedPackage) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBooking = new Booking({
      name,
      phone,
      email,
      location,
      exactLocation,
      selectedPackage,
      extraNotes: extraNotes || ''
    });

    const saved = await newBooking.save();
    console.log("📥 New Booking Saved:", saved);

    res.status(201).json(saved); // frontend expects a direct booking object

  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ message: '❌ Server error saving booking' });
  }
});

// ✅ Get All Bookings (sorted by newest first)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    // Return simplified structure if needed
    const simplified = bookings.map(b => ({
      id: b._id,
      name: b.name,
      phone: b.phone,
      location: b.location,
      exactLocation: b.exactLocation,
      selectedPackage: b.selectedPackage,
      createdAt: b.createdAt
    }));

    res.json(simplified);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: '❌ Failed to fetch bookings' });
  }
});

module.exports = router;
