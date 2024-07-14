// Import necessary modules and models
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
    const { name, email, phone, photoUrl, password } = req.body;
    console.log("🚀 ~ exports.register= ~ name, email, phone, photoUrl:", name, email, phone, photoUrl)
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

       // Hash the password before saving
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        photoUrl: photoUrl || 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      });
  
      await user.save();
  
      // Generate JWT token
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("🚀 ~ exports.login= ~ email, password:", email, password)
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🚀 ~ exports.login= ~ isMatch:", isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
