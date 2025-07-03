const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const bookingRoutes = require('./Routes/bookingRoutes');
const contactRoutes = require('./Routes/contactRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoutes');

const app = express(); // ✅ Declare app

// ✅ Startup Debug Log
console.log("🛠️ Starting Dr.Net Server...");

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static Folder (for frontend if needed)
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'frontend')));

//Default first page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'fine.html'));
});

console.log("✅ Middleware initialized");

// ✅ API Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

console.log("✅ Routes loaded");

// ✅ Health Check Route
app.get('/api/test', (req, res) => {
  res.send('✅ Server and middleware working');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
