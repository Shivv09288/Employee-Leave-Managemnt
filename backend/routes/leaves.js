const express = require('express');
const router = express.Router();
const { auth, isManager } = require('../middleware/auth');
const {
  applyLeave,
  getMyRequests,
  cancelRequest,
  getBalance,
  getAllRequests,
  getPendingRequests,
  approveLeave,
  rejectLeave
} = require('../controllers/leaveController');

// Employee routes
router.post('/', auth, applyLeave);
router.get('/my-requests', auth, getMyRequests);
router.delete('/:id', auth, cancelRequest);
router.get('/balance', auth, getBalance);

// Manager routes
router.get('/all', auth, isManager, getAllRequests);
router.get('/pending', auth, isManager, getPendingRequests);
router.put('/:id/approve', auth, isManager, approveLeave);
router.put('/:id/reject', auth, isManager, rejectLeave);

module.exports = router;
