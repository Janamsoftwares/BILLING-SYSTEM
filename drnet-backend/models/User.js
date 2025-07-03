const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  package: String,
  location: String,
  phone: String,
  paymentDate: String,
  expiryDate: String,
  debt: Number,
  routerPurchased: Boolean,
  routerCost: Number,
  subscriptionAmount: Number,
  paidSubscription: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
