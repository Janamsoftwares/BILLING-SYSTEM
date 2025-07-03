// deleteAllAdmins.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const result = await Admin.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} admin(s)`);
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error deleting admins:', err);
    process.exit(1);
  });
