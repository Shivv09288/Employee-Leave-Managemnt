import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(formData)).unwrap();
      if (result.user.role === 'manager') {
        navigate('/manager-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  if (!selectedRole) {
    return (
      <div className="login-container">
        <div className="login-hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome Back! 👋</h1>
            <p className="hero-subtitle">Choose your role to continue</p>
          </div>
          
          <div className="role-selection">
            <div className="role-card employee-card" onClick={() => setSelectedRole('employee')}>
              <div className="role-icon">👤</div>
              <h2>Employee Login</h2>
              <p>Access your leave requests and balance</p>
              <button className="role-btn employee-btn">Login as Employee</button>
            </div>

            <div className="role-divider">
              <span>OR</span>
            </div>

            <div className="role-card manager-card" onClick={() => setSelectedRole('manager')}>
              <div className="role-icon">👨‍💼</div>
              <h2>Manager Login</h2>
              <p>Review and approve leave requests</p>
              <button className="role-btn manager-btn">Login as Manager</button>
            </div>
          </div>

          <div className="register-link-container">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <button className="back-btn" onClick={() => setSelectedRole(null)}>
        ← Back to Role Selection
      </button>
      
      <div className={`auth-card ${selectedRole}-theme`}>
        <div className="card-header">
          <div className={`role-badge ${selectedRole}-badge`}>
            <div className="badge-glow"></div>
            {selectedRole === 'employee' ? '👤' : '👨‍💼'}
          </div>
          <h2 className="animated-title">
            {selectedRole === 'employee' ? 'Employee Portal' : 'Manager Portal'}
          </h2>
          <p className="subtitle">
            {selectedRole === 'employee' 
              ? 'Manage your leaves & track balance' 
              : 'Oversee team leaves & approvals'}
          </p>
          <div className="header-divider"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="modern-form">
          <div className="input-wrapper">
            <div className="input-icon"></div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="yourname@company.com"
                className="modern-input"
              />
            </div>
          </div>
          
          <div className="input-wrapper">
            <div className="input-icon"></div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your secure password"
                className="modern-input"
              />
            </div>
          </div>
          
          {error && (
            <div className="error-message">
              <div className="error-content">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <button type="submit" disabled={loading} className={`btn-submit ${selectedRole}-submit`}>
            {loading ? (
              <div className="loading-content">
                <span className="spinner"></span>
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="button-content">
                <span className="btn-text">Access Dashboard</span>
                <span className="btn-arrow">→</span>
              </div>
            )}
          </button>

          <div className="form-features">
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure Login</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Fast Access</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <span>24/7 Available</span>
            </div>
          </div>
        </form>
        
        <div className="card-footer">
          <div className="footer-content">
            <p>Don't have an account?</p>
            <Link to="/register" className="register-link">
              <span>Create New Account</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={`floating-particles ${selectedRole}-particles`}>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  );
};

export default Login;
