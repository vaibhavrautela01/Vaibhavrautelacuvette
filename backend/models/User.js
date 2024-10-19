const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  company: String,
  email: String,
  employees: Number
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
