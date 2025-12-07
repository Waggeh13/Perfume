import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  
  const deliveryFee = 59.99;
  const tax = 5.00;
  const perfumeCost = getTotalPrice();
  const total = perfumeCost + deliveryFee + tax;

  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    paymentMethod: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create order
    const order = createOrder({
      items: [...cartItems],
      shippingAddress: {
        fullName: formData.fullName,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phoneNumber: formData.phoneNumber
      },
      paymentMethod: formData.paymentMethod,
      subtotal: perfumeCost,
      deliveryFee: deliveryFee,
      tax: tax,
      total: total
    });
    
    // Clear cart
    clearCart();
    
    // Navigate to receipt page
    navigate(`/receipt/${order.id}`);
  };

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '/paypal-logo.png' },
    { id: 'credit', name: 'Credit Card' },
    { id: 'debit', name: 'Debit Card' },
    { id: 'bank', name: 'Bank Transfer' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <header className="header">
          <nav className="nav-bar">
            <div className="nav-left">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/shop" className="nav-link">Shop</Link>
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
        <main className="checkout-main">
          <div className="checkout-container">
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add some products to checkout</p>
              <Link to="/shop" className="shop-link-button">Continue Shopping</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-page">
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

      <main className="checkout-main">
        <div className="checkout-container">
          <h1 className="checkout-title">Checkout</h1>
          
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-grid">
              {/* Left Column - Shipping Address */}
              <div className="checkout-section">
                <h2 className="section-title">Shipping Address</h2>
                
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
                  <label htmlFor="streetAddress" className="form-label">Street Address</label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
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
              </div>

              {/* Right Column - Payment Method & Order Summary */}
              <div className="checkout-section">
                <h2 className="section-title">Payment Method</h2>
                
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <label 
                      key={method.id} 
                      className={`payment-option ${formData.paymentMethod === method.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        required
                      />
                      <div className="payment-option-content">
                        {method.icon && (
                          <img src={method.icon} alt={method.name} className="payment-icon" />
                        )}
                        <span>{method.name}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                  <h2 className="section-title">Order Summary</h2>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span className="summary-label">Subtotal</span>
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
                </div>

                <button type="submit" className="place-order-button">
                  Place Order
                </button>
              </div>
            </div>
          </form>
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

export default Checkout;

