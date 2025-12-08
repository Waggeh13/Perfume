import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import API_CONFIG from '../config/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from API
  const loadCartFromAPI = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}/api/cart`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.data && response.data.items) {
        setCartItems(response.data.items);
      }
    } catch (error) {
      // If cart doesn't exist or error, keep current cart items
      console.error('Error loading cart from API:', error);
    }
  }, [isAuthenticated, getAuthHeaders]);

  // Sync cart with API
  const syncCartWithAPI = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}/api/cart/sync`,
        { items: cartItems },
        {
          headers: getAuthHeaders(),
        }
      );
    } catch (error) {
      console.error('Error syncing cart with API:', error);
    }
  }, [isAuthenticated, cartItems, getAuthHeaders]);

  // Load cart from API when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      loadCartFromAPI();
    }
  }, [isAuthenticated, loadCartFromAPI]);

  // Save cart to API whenever cart items change (if authenticated)
  useEffect(() => {
    if (isAuthenticated && cartItems.length > 0) {
      // Debounce API calls to avoid too many requests
      const timeoutId = setTimeout(() => {
        syncCartWithAPI();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [cartItems, isAuthenticated, syncCartWithAPI]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartItemCount,
        getTotalPrice,
        clearCart,
        syncCartWithAPI,
        loadCartFromAPI
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

