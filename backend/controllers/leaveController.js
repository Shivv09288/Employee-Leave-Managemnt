const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
const Department = require('../models/Department');

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid start or end date' });
    }

    if (start < today) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    if (end < start) {
      return res.status(400).json({ message: 'End date cannot be before start date' });
    }
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Check leave balance
    const user = await User.findById(req.user.id).populate('department');
    
    if (user.leaveBalance[leaveType] < totalDays) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }

    // Get the current manager from the department (in case it was updated)
    let managerId = user.manager;
    if (user.department) {
      const department = await Department.findById(user.department);
      if (department && department.manager) {
        managerId = department.manager;
      }
    }

    const leaveRequest = new LeaveRequest({
      userId: req.user.id,
      managerId: managerId,
      departmentId: user.department,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason
    });

    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get my requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel request
exports.cancelRequest = async (req, res) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Can only cancel pending requests' });
    }

    await LeaveRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leave balance
exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.leaveBalance);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Manager: Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // If manager, get only their team's requests
    let query = {};
    if (user.role === 'manager') {
      query.managerId = req.user.id;
    }
    
    const requests = await LeaveRequest.find(query)
      .populate('userId', 'name email')
      .populate('managerId', 'name email')
      .sort({ createdAt: -1 });
    
    // Map userId to employee for frontend compatibility
    const mappedRequests = requests.map(req => ({
      ...req.toObject(),
      employee: req.userId
    }));
    
    res.json(mappedRequests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Manager: Get pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // If manager, get only their team's pending requests
    let query = { status: 'pending' };
    if (user.role === 'manager') {
      query.managerId = req.user.id;
    }
    
    const requests = await LeaveRequest.find(query)
      .populate('userId', 'name email')
      .populate('managerId', 'name email')
      .sort({ createdAt: -1 });
    
    // Map userId to employee for frontend compatibility
    const mappedRequests = requests.map(req => ({
      ...req.toObject(),
      employee: req.userId
    }));
    
    res.json(mappedRequests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Manager: Approve leave
exports.approveLeave = async (req, res) => {
  try {
    const { managerComment } = req.body;
    const request = await LeaveRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    // Update leave balance
    const user = await User.findById(request.userId);
    user.leaveBalance[request.leaveType] -= request.totalDays;
    await user.save();

    request.status = 'approved';
    request.managerComment = managerComment;
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Manager: Reject leave
exports.rejectLeave = async (req, res) => {
  try {
    const { managerComment } = req.body;
    const request = await LeaveRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    request.status = 'rejected';
    request.managerComment = managerComment;
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
