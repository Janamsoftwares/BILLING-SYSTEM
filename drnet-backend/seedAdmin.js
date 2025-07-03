require('dotenv').config(); // Load .env first

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log("🔁 Removing existing admin...");
      await Admin.deleteOne({ username: 'admin' });
    }

    const hashed = await bcrypt.hash('12345', 10);
    const newAdmin = new Admin({ username: 'admin', password: hashed });

    await newAdmin.save();
    console.log("✅ Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

run();
