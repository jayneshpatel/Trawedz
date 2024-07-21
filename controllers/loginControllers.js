const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the credentials belong to a Super Admin
    if (email === 'admin@example.com' && password === 'admin123') {
      // Generate JWT token for Super Admin
      const token = jwt.sign({ email: email, role: 'Super Admin' }, 'your_secret_key');
      return res.json({ message: 'Welcome, super admin in the Trawedz CMS!', token });
    }

    // Check if the credentials belong to a Sub Admin
    const subAdmin = await User.findOne({ email, role: 'Sub Admin' });
    if (subAdmin) {
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, subAdmin.password);
      if (passwordMatch) {
        // Generate JWT token for Sub Admin
        const token = jwt.sign({ email: email, role: 'Sub Admin' }, 'your_secret_key');
        return res.json({ message: 'Welcome, sub admin in the Trawedz CMS!', token });
      }
    }
    
    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createSubAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new sub-admin user with hashed password and creation date
    const subAdmin = new User({
      email,
      password: hashedPassword,
      role,
      creationDate: new Date() // Add date and time of creation
    });

    // Save the new sub-admin user in the database
    await subAdmin.save();

    // Respond with message, creation date, and time
    res.json({ 
      message: 'Sub Admin created successfully',
      creationDateTime: subAdmin.creationDate // Return creation date and time
    });
  } catch (error) {
    console.error('Error creating sub-admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

