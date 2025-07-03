// changePassword.js
const mongoose = require('mongoose');
const readline = require('readline');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

// Set up terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askPassword = () => {
  rl.question('Enter new password for "drnet": ', async (newPassword) => {
    try {
      await mongoose.connect(process.env.MONGO_URI);

      const admin = await Admin.findOne({ username: 'drnet' });
      if (!admin) {
        console.log('❌ Admin "drnet" not found');
        rl.close();
        process.exit();
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      admin.password = hashed;
      await admin.save();

      console.log('✅ Password updated successfully for "drnet"');
      rl.close();
      process.exit();
    } catch (err) {
      console.error('❌ Error:', err);
      rl.close();
      process.exit(1);
    }
  });
};

askPassword();
