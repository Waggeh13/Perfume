import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CartIcon from '../components/CartIcon';
import API_CONFIG from '../config/api';
import '../styles/pages/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, getAuthHeaders, logout } = useAuth();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'error',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load user data from API
  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    // PLACEHOLDER: For now, use mock user data
    // Replace this with actual API call when backend is ready
    const USE_PLACEHOLDER = true; // Set to false when API is ready
    
    if (USE_PLACEHOLDER) {
      // Use placeholder customer details
      setUserData({
        fullName: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        phoneNumber: user?.phoneNumber || '+1234567890',
        address: '123 Main Street, City, State 12345'
      });
      return;
    }

    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}/api/users/profile`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data) {
        setUserData({
          fullName: response.data.fullName || user?.name || '',
          email: response.data.email || user?.email || '',
          phoneNumber: response.data.phoneNumber || user?.phoneNumber || '',
          address: response.data.address || ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Use data from token if API fails
      if (user) {
        setUserData({
          fullName: user.name || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          address: ''
        });
      }
    }
  };

  const showToast = (message, type = 'error') => {
    setToast({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'error' });
    }, 3000);
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    // PLACEHOLDER: For now, just update local state
    // Replace this with actual API call when backend is ready
    const USE_PLACEHOLDER = true; // Set to false when API is ready
    
    if (USE_PLACEHOLDER) {
      // Simulate API delay
      setTimeout(() => {
        showToast('Profile updated successfully! (Using placeholder - changes not saved)', 'success');
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await axios.put(
        `${API_CONFIG.BASE_URL}/api/users/profile`,
        userData,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data.error) {
        showToast(response.data.message || 'Failed to update profile.');
        return;
      }

      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match.');
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }

    setPasswordLoading(true);

    // PLACEHOLDER: For now, just simulate password change
    // Replace this with actual API call when backend is ready
    const USE_PLACEHOLDER = true; // Set to false when API is ready
    
    if (USE_PLACEHOLDER) {
      // Simulate API delay
      setTimeout(() => {
        showToast('Password changed successfully! (Using placeholder - changes not saved)', 'success');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/api/users/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data.error) {
        showToast(response.data.message || 'Failed to change password.');
        return;
      }

      showToast('Password changed successfully!', 'success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to change password. Please try again.'
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="profile-page">
      {/* Header Navigation */}
      <header className="header">
        <nav className="nav-bar">
          <div className="nav-left">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/orders" className="nav-link">My Orders</Link>
          </div>
          <div className="nav-center">
            <img src="/perfume_logo.png" alt="NOULA" className="logo" />
          </div>
          <div className="nav-right">
            <Link to="/search" className="icon-button search-icon-button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </Link>
            <Link to="/profile" className="icon-button" aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            <CartIcon />
          </div>
        </nav>
        <div className="header-divider"></div>
      </header>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-container">
          <h2 className="profile-title">My Profile</h2>
          <p className="profile-subtitle">
            Manage your account information and preferences
          </p>

          {/* User Information Section */}
          <div className="profile-section">
            <h3 className="section-title">Personal Information</h3>
            <form className="profile-form" onSubmit={handleUpdateProfile}>
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleUserDataChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleUserDataChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleUserDataChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={userData.address}
                      onChange={handleUserDataChange}
                      className="form-input"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Change Password Section */}
          <div className="profile-section">
            <h3 className="section-title">Change Password</h3>
            <form className="profile-form" onSubmit={handleChangePassword}>
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={passwordLoading}>
                {passwordLoading ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Logout Button */}
          <div className="profile-section">
            <button 
              className="logout-button" 
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      {/* Toast popup */}
      {toast.show && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            textAlign: 'center',
            backgroundColor: toast.type === 'success' ? '#d4edda' : '#f8d7da',
            color: toast.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${toast.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            lineHeight: '1.4',
            zIndex: 1000,
            minWidth: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Profile;

