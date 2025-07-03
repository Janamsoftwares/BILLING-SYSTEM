// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  location: String,
  exactLocation: String,
  package: String,            // for frontend `package`
  selectedPackage: String,    // for legacy or alt key
  extraNotes: String,         // for optional notes
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
