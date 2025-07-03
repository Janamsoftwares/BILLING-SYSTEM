const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const {
      name,
      package: userPackage,
      location,
      phone,
      paymentDate,
      expiryDate,
      debt,
      routerPurchased,
      routerCost,
      subscriptionAmount,
      paidSubscription
    } = req.body;

    const user = new User({
      name,
      package: userPackage,
      location,
      phone,
      paymentDate,
      expiryDate,
      debt,
      routerPurchased,
      routerCost: routerPurchased ? parseFloat(routerCost) || 0 : 0,
      subscriptionAmount: parseFloat(subscriptionAmount) || 0,
      paidSubscription: paidSubscription === true || paidSubscription === 'true' || paidSubscription === 'on'
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined') return res.status(400).json({ message: 'Invalid user ID' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined') return res.status(400).json({ message: 'Invalid user ID' });

    const {
      subscriptionAmount,
      routerCost,
      paidSubscription,
      ...rest
    } = req.body;

    const updatedFields = {
      ...rest,
      subscriptionAmount: parseFloat(subscriptionAmount) || 0,
      routerCost: routerCost ? parseFloat(routerCost) || 0 : 0,
      paidSubscription: paidSubscription === true || paidSubscription === 'true' || paidSubscription === 'on'
    };

    const updated = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined') return res.status(400).json({ message: 'Invalid user ID' });

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: '🗑️ User deleted' });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
