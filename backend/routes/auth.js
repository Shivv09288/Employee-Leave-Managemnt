const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const Department = require('../models/Department');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

// Get all departments for registration
router.get('/public/departments', async (req, res) => {
  try {
    const departments = await Department.find().populate('manager', 'name email');
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
