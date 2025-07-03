const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// ✅ Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const trimmedUsername = username.trim().toLowerCase();
    const admin = await Admin.findOne({ username: trimmedUsername });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: '✅ Login successful' });
  } catch (error) {
    console.error('❌ Admin login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ TEMP: Delete All Admins
router.get('/delete-all', async (req, res) => {
  try {
    const result = await Admin.deleteMany({});
    res.json({
      message: '🗑️ All admins deleted',
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error('❌ Error deleting admins:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ TEMP: Create Default Admin
router.get('/create-default', async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: 'drnet' });

    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('Janam@2030', 10);
    const newAdmin = new Admin({
      username: 'drnet',
      password: hashedPassword,
    });

    await newAdmin.save();
    res.json({
      message: '✅ New admin created',
      admin: { username: newAdmin.username },
    });
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
