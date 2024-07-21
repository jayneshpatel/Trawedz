const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema for super admin
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Super Admin', 'Admin', 'Sub Admin', 'User'], default: 'User' },
  creationDate: { type: Date, default: Date.now } // Add creation date field
});

// Hash the password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
