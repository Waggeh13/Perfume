import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartIcon.css';

const CartIcon = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Link to="/cart" className="cart-icon-wrapper">
      <button className="icon-button cart-icon-button" aria-label="Shopping Cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </button>
    </Link>
  );
};

export default CartIcon;

