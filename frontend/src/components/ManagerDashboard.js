import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { fetchPendingRequests, fetchAllRequests, approveLeave, rejectLeave } from '../redux/slices/leaveSlice';
import ManagerStats from './ManagerStats';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { pendingRequests, allRequests, loading } = useSelector((state) => state.leaves);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'manager') {
      navigate('/dashboard');
      return;
    }
    dispatch(fetchPendingRequests());
    dispatch(fetchAllRequests());
  }, [dispatch, token, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleApprove = async (id) => {
    const comment = prompt('Enter approval comment (optional):');
    try {
      await dispatch(approveLeave({ id, managerComment: comment || 'Approved' })).unwrap();
      alert('Leave request approved successfully!');
      dispatch(fetchPendingRequests());
      dispatch(fetchAllRequests());
    } catch (err) {
      alert('Failed to approve: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    const comment = prompt('Enter rejection reason:');
    if (!comment) {
      alert('Rejection reason is required');
      return;
    }
    try {
      await dispatch(rejectLeave({ id, managerComment: comment })).unwrap();
      alert('Leave request rejected');
      dispatch(fetchPendingRequests());
      dispatch(fetchAllRequests());
    } catch (err) {
      alert('Failed to reject: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="manager-dashboard">
      <header className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'Manager'}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <ManagerStats allRequests={allRequests} pendingRequests={pendingRequests} />

        {/* Pending Requests Section */}
        <div className="section">
          <h2>⏳ Pending Leave Requests ({pendingRequests?.length || 0})</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : !pendingRequests || pendingRequests.length === 0 ? (
            <div className="no-data">No pending requests</div>
          ) : (
            <div className="requests-grid">
              {pendingRequests.map((request) => (
                <div key={request._id} className="request-card pending">
                  <div className="card-header">
                    <span className="employee-name">👤 {request.employee?.name || 'Unknown'}</span>
                    <span className={`leave-type ${request.leaveType}`}>
                      {request.leaveType}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="date-range">
                      <div>
                        <strong>From:</strong> {formatDate(request.startDate)}
                      </div>
                      <div>
                        <strong>To:</strong> {formatDate(request.endDate)}
                      </div>
                      <div>
                        <strong>Days:</strong> {request.totalDays || 'N/A'}
                      </div>
                    </div>
                    <div className="reason">
                      <strong>Reason:</strong>
                      <p>{request.reason}</p>
                    </div>
                    <div className="applied-date">
                      Applied on: {formatDate(request.createdAt)}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => handleApprove(request._id)}
                      className="btn-approve"
                      disabled={loading}
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="btn-reject"
                      disabled={loading}
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Requests Section */}
        <div className="section">
          <h2>📋 All Leave History ({allRequests?.length || 0})</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : !allRequests || allRequests.length === 0 ? (
            <div className="no-data">No leave requests found</div>
          ) : (
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Status</th>
                    <th>Applied On</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {allRequests.map((request) => (
                    <tr key={request._id}>
                      <td className="employee-cell">{request.employee?.name || 'Unknown'}</td>
                      <td>
                        <span className={`type-badge ${request.leaveType}`}>
                          {request.leaveType}
                        </span>
                      </td>
                      <td>{formatDate(request.startDate)}</td>
                      <td>{formatDate(request.endDate)}</td>
                      <td className="days-cell">{request.totalDays || 'N/A'}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>{formatDate(request.createdAt)}</td>
                      <td className="reason-cell">{request.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
