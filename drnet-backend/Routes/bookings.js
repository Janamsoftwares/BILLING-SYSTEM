const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  location: String,
  exactLocation: String,
  selectedPackage: String,
  extraNotes: String
}, { timestamps: true }); // ✅ add this

module.exports = mongoose.model('Booking', bookingSchema);
