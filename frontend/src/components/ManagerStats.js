import React from 'react';
import './ManagerStats.css';

const ManagerStats = ({ allRequests, pendingRequests }) => {
  const calculateStats = () => {
    const total = allRequests?.length || 0;
    const pending = pendingRequests?.length || 0;
    const approved = allRequests?.filter(req => req.status === 'approved').length || 0;
    const rejected = allRequests?.filter(req => req.status === 'rejected').length || 0;
    
    const uniqueEmployees = new Set(allRequests?.map(req => req.employee?._id)).size;
    
    const leaveTypes = {
      annual: allRequests?.filter(req => req.leaveType === 'annual').length || 0,
      sick: allRequests?.filter(req => req.leaveType === 'sick').length || 0,
      casual: allRequests?.filter(req => req.leaveType === 'casual').length || 0
    };

    return {
      total,
      pending,
      approved,
      rejected,
      uniqueEmployees,
      leaveTypes
    };
  };

  const stats = calculateStats();

  return (
    <div className="manager-stats">
      <h2>📊 Team Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card approved">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>

        <div className="stat-card employees">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.uniqueEmployees}</h3>
            <p>Team Members</p>
          </div>
        </div>
      </div>

      <div className="leave-type-stats">
        <h3>Leave Types Breakdown</h3>
        <div className="type-bars">
          <div className="type-bar">
            <span className="type-label">Annual Leave</span>
            <div className="bar-container">
              <div 
                className="bar annual" 
                style={{ width: `${stats.total ? (stats.leaveTypes.annual / stats.total * 100) : 0}%` }}
              >
                <span className="bar-value">{stats.leaveTypes.annual}</span>
              </div>
            </div>
          </div>
          <div className="type-bar">
            <span className="type-label">Sick Leave</span>
            <div className="bar-container">
              <div 
                className="bar sick" 
                style={{ width: `${stats.total ? (stats.leaveTypes.sick / stats.total * 100) : 0}%` }}
              >
                <span className="bar-value">{stats.leaveTypes.sick}</span>
              </div>
            </div>
          </div>
          <div className="type-bar">
            <span className="type-label">Casual Leave</span>
            <div className="bar-container">
              <div 
                className="bar casual" 
                style={{ width: `${stats.total ? (stats.leaveTypes.casual / stats.total * 100) : 0}%` }}
              >
                <span className="bar-value">{stats.leaveTypes.casual}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerStats;
