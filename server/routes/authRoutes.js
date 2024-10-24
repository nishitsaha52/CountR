const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', getCurrentUser);

// Protected routes (Example: Only accessible by Admins)
router.get('/admin/data', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! This is your data.' });
});

// Protected route (Example: Only accessible by Managers)
router.get('/manager/data', authMiddleware, roleMiddleware('manager'), (req, res) => {
  res.json({ message: 'Welcome Manager! This is your data.' });
});

module.exports = router;
 