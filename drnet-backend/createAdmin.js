// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const username = 'drnet';
    const password = 'Janam@2030';

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username: username.toLowerCase(),
      password: hashedPassword
    });

    await newAdmin.save();
    console.log(`✅ Admin created: ${username} / ${password}`);
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  });
