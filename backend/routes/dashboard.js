const express = require('express');
const router = express.Router();
const { auth, isManager } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/dashboardController');

router.get('/stats', auth, isManager, getDashboardStats);

module.exports = router;
