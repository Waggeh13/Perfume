import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, syncCartWithAPI } = useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Sync cart with API when user is authenticated
  useEffect(() => {
    if (isAuthenticated && cartItems.length > 0) {
      syncCartWithAPI();
    }
  }, [isAuthenticated]); // Only run when authentication status changes

  // Preload Checkout component when cart has items (for faster navigation)
  useEffect(() => {
    if (cartItems.length > 0) {
      // Preload the checkout chunk
      import('../pages/Checkout');
    }
  }, [cartItems.length]);

  const deliveryFee = 59.99;
  const tax = 5.00;
  const perfumeCost = getTotalPrice();
  const total = perfumeCost + deliveryFee + tax;

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + change);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const getProductSize = (product) => {
    // Extract size from product or use default
    if (product.size) return product.size;
    // For perfumes, default to 100ml, for body products use their size
    return product.id >= 100 ? '250ml' : '100ml';
  };

  const getProductType = (product) => {
    // Determine if it's a perfume or body product
    if (product.id >= 100) {
      return 'Body Care';
    }
    return 'Eau de perfum Spray';
  };

  return (
    <div className="cart-page">
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
            {isAuthenticated ? (
              <Link to="/profile" className="icon-button" aria-label="Profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            ) : (
              <Link to="/login" className="icon-button" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            )}
            <CartIcon />
          </div>
        </nav>
        <div className="header-divider"></div>
      </header>

      <main className="cart-main">
        <div className="cart-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2 className="empty-cart-title">Your shopping bag is empty</h2>
              <p className="empty-cart-text">Add some products to get started!</p>
              <Link to="/shop" className="shop-link-button">Continue Shopping</Link>
            </div>
          ) : (
            <div className="cart-grid">
              {/* Left Column - Shopping Bag */}
              <div className="cart-items-section">
                <h2 className="cart-section-title">Shopping Bag</h2>
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image-container">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                      </div>
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-info">{getProductType(item)} - {getProductSize(item)}</p>
                        <p className="cart-item-price">{item.price}</p>
                        <div className="cart-item-controls">
                          <div className="cart-quantity-selector">
                            <button
                              className="cart-quantity-button"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="cart-quantity-value">{item.quantity}</span>
                            <button
                              className="cart-quantity-button"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="remove-link"
                            onClick={() => handleRemove(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="order-summary-section">
                <h2 className="cart-section-title">Order Summary</h2>
                <p className="order-summary-subtitle">Total cost includes delivery fee and tax</p>
                
                <div className="order-summary-details">
                  <div className="summary-row">
                    <span className="summary-label">Perfume Cost</span>
                    <span className="summary-value">${perfumeCost.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Delivery Fee</span>
                    <span className="summary-value">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Tax</span>
                    <span className="summary-value">${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span className="summary-label">Total</span>
                    <span className="summary-value">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="buy-now-button" 
                  onClick={() => {
                    if (!isAuthenticated) {
                      // Redirect to login if not authenticated, with return path
                      navigate('/login', { state: { from: '/cart', returnTo: '/checkout' } });
                    } else {
                      navigate('/checkout');
                    }
                  }}
                >
                  <span className="buy-now-button-text">Proceed to Checkout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">2025 NOULA. All rights reserved.</p>
        <div className="footer-social">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.357.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span className="instagram-handle">@noulaparfums</span>
        </div>
      </footer>
    </div>
  );
};

export default Cart;

