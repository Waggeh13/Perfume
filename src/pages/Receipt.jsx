import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/Receipt.css';

const Receipt = () => {
  const { id } = useParams();
  const { getOrderById } = useOrders();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const order = getOrderById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!order) {
    return (
      <div className="receipt-page">
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
        <main className="receipt-main">
          <div className="receipt-container">
            <div className="not-found">
              <h2>Order not found</h2>
              <p>The order you're looking for doesn't exist.</p>
              <Link to="/orders" className="back-link">View All Orders</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#666666';
      case 'shipped':
        return '#0066cc';
      case 'delivered':
        return '#00aa00';
      case 'cancelled':
        return '#cc0000';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProductSize = (product) => {
    if (product.size) return product.size;
    return product.id >= 100 ? '250ml' : '100ml';
  };

  const getProductType = (product) => {
    if (product.id >= 100) {
      return 'Body Care';
    }
    return 'Eau de perfum Spray';
  };

  return (
    <div className="receipt-page">
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

      <main className="receipt-main">
        <div className="receipt-container">
          <div className="receipt-header">
            <h1 className="receipt-title">Order Receipt</h1>
            <button className="back-button" onClick={() => navigate('/orders')}>
              ← Back to Orders
            </button>
          </div>

          <div className="receipt-content">
            {/* Order Info */}
            <div className="receipt-section">
              <h2 className="section-title">Order Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Order Number:</span>
                  <span className="info-value">{order.orderNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Order Date:</span>
                  <span className="info-value">{formatDate(order.date)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status:</span>
                  <span 
                    className="info-value status-badge" 
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">
                    {(() => {
                      const method = order.paymentMethod;
                      if (method && typeof method === 'string' && method.length > 0) {
                        return method.charAt(0).toUpperCase() + method.slice(1);
                      }
                      return 'Not specified';
                    })()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="receipt-section">
                <h2 className="section-title">Shipping Address</h2>
                <div className="address-block">
                  <p className="address-line">{order.shippingAddress.fullName || 'N/A'}</p>
                  <p className="address-line">{order.shippingAddress.streetAddress || 'N/A'}</p>
                  <p className="address-line">
                    {order.shippingAddress.city || ''}, {order.shippingAddress.state || ''} {order.shippingAddress.zipCode || ''}
                  </p>
                  <p className="address-line">{order.shippingAddress.country || 'N/A'}</p>
                  <p className="address-line">Phone: {order.shippingAddress.phoneNumber || 'N/A'}</p>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="receipt-section">
              <h2 className="section-title">Order Items</h2>
              <div className="items-list">
                {order.items.map((item) => (
                  <div key={item.id} className="receipt-item">
                    <div className="receipt-item-image-container">
                      <img src={item.image} alt={item.name} className="receipt-item-image" />
                    </div>
                    <div className="receipt-item-details">
                      <h3 className="receipt-item-name">{item.name}</h3>
                      <p className="receipt-item-info">{getProductType(item)} - {getProductSize(item)}</p>
                      <div className="receipt-item-footer">
                        <span className="receipt-item-quantity">Quantity: {item.quantity}</span>
                        <span className="receipt-item-price">{item.price} × {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="receipt-section">
              <h2 className="section-title">Order Summary</h2>
              <div className="summary-block">
                <div className="summary-row">
                  <span className="summary-label">Subtotal:</span>
                  <span className="summary-value">${(order.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Delivery Fee:</span>
                  <span className="summary-value">${(order.deliveryFee || 0).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax:</span>
                  <span className="summary-value">${(order.tax || 0).toFixed(2)}</span>
                </div>
                <div className="summary-row summary-total">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value">${(order.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
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

export default Receipt;

