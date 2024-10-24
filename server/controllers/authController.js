const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'yourJWTSecretKey';

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, email, password, role });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1500h' });

    res.json({ token, user: { username: newUser.username, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1500h' });

    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // Assuming the token is sent in the Authorization header
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Fetch user from the database
    const user = await User.findById(userId).select('username role'); // Select only needed fields
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser }; // Add the new function to exports

