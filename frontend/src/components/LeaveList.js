import React from 'react';
import { useDispatch } from 'react-redux';
import { cancelRequest } from '../redux/slices/leaveSlice';
import './LeaveList.css';

const LeaveList = ({ requests }) => {
  const dispatch = useDispatch();

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this leave request?')) {
      try {
        await dispatch(cancelRequest(id)).unwrap();
        alert('Leave request cancelled successfully!');
      } catch (err) {
        alert('Failed to cancel request: ' + err.message);
      }
    }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!requests || requests.length === 0) {
    return <div className="no-data">No leave requests found.</div>;
  }

  return (
    <div className="leave-list">
      {requests.map((request) => (
        <div key={request._id} className="leave-card">
          <div className="leave-header">
            <span className={`status-badge ${getStatusClass(request.status)}`}>
              {request.status.toUpperCase()}
            </span>
            <span className="leave-type">{request.leaveType} Leave</span>
          </div>
          <div className="leave-dates">
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
          <div className="leave-reason">
            <strong>Reason:</strong>
            <p>{request.reason}</p>
          </div>
          {request.managerComment && (
            <div className="manager-comment">
              <strong>Manager Comment:</strong>
              <p>{request.managerComment}</p>
            </div>
          )}
          {request.status === 'pending' && (
            <button
              onClick={() => handleCancel(request._id)}
              className="btn-cancel"
            >
              Cancel Request
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeaveList;
