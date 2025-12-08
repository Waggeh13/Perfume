import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartIcon from '../components/CartIcon';
import API_CONFIG from '../config/api';
import '../styles/pages/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { cartItems, syncCartWithAPI } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'error',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match.');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/api/users/register`,
        {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle backend-side errors (even if 200 OK)
      if (response.data.error) {
        showToast(response.data.message || 'Registration failed. Please try again.');
        return;
      }

      // If registration includes auto-login with token
      if (response.data.token) {
        const token = response.data.token;
        const tokenData = jwtDecode(token);
        login(token, tokenData, 'user');
        
        // Sync cart with API after successful registration
        if (cartItems.length > 0) {
          await syncCartWithAPI();
        }
        
        showToast('Registration successful!', 'success');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        // If registration requires email verification or manual login
        showToast('Registration successful! Please login.', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
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
            <button className="icon-button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <Link to="/login" className="icon-button" aria-label="Account">
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
      <main className="register-main">
        <div className="register-container">
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">
            Create your Noula account to explore timeless scents that define your essence
          </p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

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

          <p className="account-link">
            Already have an account? <Link to="/login" className="link-text">Login here</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;

