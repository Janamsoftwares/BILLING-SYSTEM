const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true // 👈 ensures consistency during login
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // ✅ Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Admin', adminSchema);
