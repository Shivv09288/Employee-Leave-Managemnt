import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { fetchMyRequests, fetchBalance } from '../redux/slices/leaveSlice';
import LeaveForm from './LeaveForm';
import LeaveList from './LeaveList';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { myRequests, balance } = useSelector((state) => state.leaves);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(fetchMyRequests());
    dispatch(fetchBalance());
  }, [dispatch, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Employee Leave Management</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="balance-card">
          <h3>Leave Balance</h3>
          {balance && (
            <div className="balance-info">
              <div className="balance-item">
                <span>Annual Leave:</span>
                <strong>{balance.annual || 0} days</strong>
              </div>
              <div className="balance-item">
                <span>Sick Leave:</span>
                <strong>{balance.sick || 0} days</strong>
              </div>
              <div className="balance-item">
                <span>Casual Leave:</span>
                <strong>{balance.casual || 0} days</strong>
              </div>
            </div>
          )}
        </div>

        <div className="leave-section">
          <h2>Apply for Leave</h2>
          <LeaveForm />
        </div>

        <div className="leave-section">
          <h2>My Leave Requests</h2>
          <LeaveList requests={myRequests} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
