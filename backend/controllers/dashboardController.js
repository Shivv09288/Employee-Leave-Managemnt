const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
const Department = require('../models/Department');

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    let totalEmployees, pendingRequests, approvedRequests, rejectedRequests;
    
    if (user.role === 'manager') {
      // For managers, show only their team's statistics
      totalEmployees = await User.countDocuments({ manager: req.user.id });
      pendingRequests = await LeaveRequest.countDocuments({ status: 'pending', managerId: req.user.id });
      approvedRequests = await LeaveRequest.countDocuments({ status: 'approved', managerId: req.user.id });
      rejectedRequests = await LeaveRequest.countDocuments({ status: 'rejected', managerId: req.user.id });
    } else {
      // For admins or others, show all statistics
      totalEmployees = await User.countDocuments({ role: 'employee' });
      pendingRequests = await LeaveRequest.countDocuments({ status: 'pending' });
      approvedRequests = await LeaveRequest.countDocuments({ status: 'approved' });
      rejectedRequests = await LeaveRequest.countDocuments({ status: 'rejected' });
    }

    res.json({
      totalEmployees,
      pendingRequests,
      approvedRequests,
      rejectedRequests
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
