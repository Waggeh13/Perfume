import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/Orders.css';

const Orders = () => {
  const { getAllOrders } = useOrders();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const orders = getAllOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check authentication when component mounts
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login', { state: { from: '/orders' } });
    }
  }, [isAuthenticated, isLoading, navigate]);

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
      day: 'numeric'
    });
  };

  return (
    <div className="orders-page">
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

      <main className="orders-main">
        <div className="orders-container">
          <h1 className="orders-title">My Orders</h1>

          {!isLoading && !isAuthenticated ? (
            <div className="empty-orders">
              <h2 className="empty-orders-title">Please log in to view your orders</h2>
              <p className="empty-orders-text">You need to be logged in to see your order history.</p>
              <Link to="/login" className="shop-link-button">Log In</Link>
            </div>
          ) : isLoading ? (
            <div className="empty-orders">
              <h2 className="empty-orders-title">Loading...</h2>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-orders">
              <h2 className="empty-orders-title">No orders yet</h2>
              <p className="empty-orders-text">Start shopping to see your orders here!</p>
              <Link to="/shop" className="shop-link-button">Start Shopping</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-number">Order {order.orderNumber}</h3>
                      <p className="order-date">Placed on {formatDate(order.date)}</p>
                    </div>
                    <div className="order-status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                      {getStatusText(order.status)}
                    </div>
                  </div>

                  <div className="order-items-preview">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="order-item-preview">
                        <img src={item.image} alt={item.name} className="order-item-image" />
                        <div className="order-item-details">
                          <p className="order-item-name">{item.name}</p>
                          <p className="order-item-quantity">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="more-items">+{order.items.length - 3} more item(s)</p>
                    )}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span className="total-label">Total:</span>
                      <span className="total-value">${order.total.toFixed(2)}</span>
                    </div>
                    <button
                      className="view-receipt-button"
                      onClick={() => navigate(`/receipt/${order.id}`)}
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              ))}
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

export default Orders;

