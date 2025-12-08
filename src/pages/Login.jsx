import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartIcon from '../components/CartIcon';
import API_CONFIG from '../config/api';
import '../styles/pages/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { cartItems, syncCartWithAPI } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      // PLACEHOLDER: For now, use mock login data
      // Replace this with actual API call when backend is ready
      const USE_PLACEHOLDER = true; // Set to false when API is ready
      
      if (USE_PLACEHOLDER) {
        // Mock successful login
        const mockToken = 'placeholder_jwt_token_' + Date.now();
        const mockTokenData = {
          id: '1',
          email: formData.email,
          name: 'John Doe',
          phoneNumber: '+1234567890',
          exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
        };
        
        login(mockToken, mockTokenData, 'user');
        
        // Sync cart with API after successful login
        if (cartItems.length > 0) {
          await syncCartWithAPI();
        }
        
        showToast('Login successful! (Using placeholder data)', 'success');
        
        // Redirect to previous page or returnTo path, or home
        const returnTo = location.state?.returnTo || location.state?.from || '/';
        setTimeout(() => {
          navigate(returnTo);
        }, 1000);
        setLoading(false);
        return;
      }

      // Actual API call (when USE_PLACEHOLDER is false)
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/api/auth/login`,
        {
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
        showToast(response.data.message || 'Login failed. Please try again.');
        return;
      }

      const token = response.data.token;
      if (!token || typeof token !== 'string') {
        showToast('Invalid token received from server.');
        return;
      }

      const tokenData = jwtDecode(token);
      login(token, tokenData, 'user');
      
      // Sync cart with API after successful login
      if (cartItems.length > 0) {
        await syncCartWithAPI();
      }
      
      showToast('Login successful!', 'success');
      
      // Redirect to previous page or returnTo path, or home
      const returnTo = location.state?.returnTo || location.state?.from || '/';
      setTimeout(() => {
        navigate(returnTo);
      }, 1000);
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
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
            {/* Icons removed for login page */}
          </div>
        </nav>
        <div className="header-divider"></div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">
            Welcome back to Noula — where every scent feels like home.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
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
            Don't have an account? <Link to="/register" className="link-text">Create one here</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;

