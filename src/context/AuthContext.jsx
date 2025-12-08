import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

// Unique keys for this project's auth data
const PERFUME_AUTH_TOKEN_KEY = 'perfume_auth_token';
const PERFUME_USER_DATA_KEY = 'perfume_user_data';
const PERFUME_USER_TYPE_KEY = 'perfume_user_type';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem(PERFUME_AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(PERFUME_USER_DATA_KEY);
    const storedUserType = localStorage.getItem(PERFUME_USER_TYPE_KEY);

    // Check if data exists and is not the string "undefined"
    if (storedToken && userData && storedUserType && 
        userData !== 'undefined' && storedToken !== 'undefined') {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setUserType(storedUserType);
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        // Only clear if there was an actual parsing error
        clearAuth();
      }
    }

    setIsLoading(false);
  }, []);

  // Login function - stores token, user data, and user type
  const login = (token, userData, type = 'user') => {
    localStorage.setItem(PERFUME_AUTH_TOKEN_KEY, token);
    localStorage.setItem(PERFUME_USER_DATA_KEY, JSON.stringify(userData));
    localStorage.setItem(PERFUME_USER_TYPE_KEY, type);

    setUser(userData);
    setUserType(type);
    setToken(token);
    setIsAuthenticated(true);
  };

  // Logout function - clears all stored data
  const logout = () => {
    localStorage.removeItem(PERFUME_AUTH_TOKEN_KEY);
    localStorage.removeItem(PERFUME_USER_DATA_KEY);
    localStorage.removeItem(PERFUME_USER_TYPE_KEY);

    setUser(null);
    setUserType(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Clear auth data (for error cases)
  const clearAuth = () => {
    localStorage.removeItem(PERFUME_AUTH_TOKEN_KEY);
    localStorage.removeItem(PERFUME_USER_DATA_KEY);
    localStorage.removeItem(PERFUME_USER_TYPE_KEY);

    setUser(null);
    setUserType(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Get stored auth token
  const getAuthToken = () => {
    return token || localStorage.getItem(PERFUME_AUTH_TOKEN_KEY);
  };

  // Get authorization headers for API calls
  const getAuthHeaders = () => {
    const currentToken = getAuthToken();
    return currentToken
      ? {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };
  };

  // Validate token and handle 401 errors
  const validateToken = (error) => {
    if (error?.response?.status === 401) {
      clearAuth();
      window.location.href = '/login';
      return false; // Token is invalid
    }
    return true; // Token is valid or error is not auth-related
  };

  // Helper functions to check user roles
  const isUser = () => userType === 'user';
  const getUserType = () => userType;

  const value = {
    user,
    userType,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    clearAuth,
    getAuthToken,
    getAuthHeaders,
    validateToken,
    isUser,
    getUserType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

