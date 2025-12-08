import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // This would typically come from an API or context
  const allProducts = [
    {
      id: 1,
      name: 'Velour Mist',
      size: '100ml',
      price: '$72.00',
      inStock: true,
      description: 'Soft and captivating - a blend of white florals and warm musk that lingers like silk on the skin. This fragrance opens with delicate notes of white florals that create an airy, ethereal beginning. As it develops, warm musk notes emerge, creating a sensual and lasting impression. Perfect for those who appreciate understated elegance and timeless sophistication.',
      image: '/perfume-removebg-preview (1).png'
    },
    {
      id: 2,
      name: 'Eclat d\'Aube',
      size: '100ml',
      price: '$83.00',
      inStock: true,
      description: '(Glow of Dawn) - a radiant mix of citrus and amber, inspired by the quiet elegance of early morning light. The fragrance begins with bright citrus notes that sparkle like morning dew, gradually transitioning into a warm amber heart. This scent captures the peaceful beauty of dawn, offering a luminous and uplifting experience that lasts throughout the day.',
      image: '/perfume10-removebg-preview.png'
    },
    {
      id: 3,
      name: 'Whispered Iris',
      size: '100ml',
      price: '$90.00',
      inStock: true,
      description: 'Delicate yet confident - notes of iris and vanilla wrapped in subtle wood, a scent that speaks in whispers. The iris provides an elegant, powdery softness while vanilla adds warmth and comfort. Subtle wood notes ground the fragrance, creating a sophisticated blend that is both gentle and memorable.',
      image: '/perfume4-removebg-preview.png'
    },
    {
      id: 4,
      name: 'Noir Amara',
      size: '100ml',
      price: '$65.00',
      inStock: true,
      description: 'Darkly elegant - amber, patchouli, and rose intertwined in a sensual harmony of mystery and grace. Rich amber creates depth while patchouli adds an earthy sophistication. The rose note brings a touch of romance, resulting in a fragrance that is both mysterious and alluring.',
      image: '/perfume9-removebg-preview.png'
    },
    {
      id: 5,
      name: 'Midnight Bloom',
      size: '100ml',
      price: '$88.00',
      inStock: true,
      description: 'A mysterious blend of dark florals and rich vanilla that captivates the senses. This fragrance opens with deep floral notes that create an enchanting atmosphere, while vanilla adds a creamy, comforting warmth. Perfect for evening wear, Midnight Bloom is both seductive and sophisticated.',
      image: '/perfume2-removebg-preview.png'
    },
    {
      id: 6,
      name: 'Sunset Serenade',
      size: '100ml',
      price: '$75.00',
      inStock: true,
      description: 'Warm and inviting - notes of amber, sandalwood, and a hint of citrus create an unforgettable evening scent. The amber provides warmth and depth, while sandalwood adds a creamy, luxurious quality. A subtle citrus note brightens the composition, making it perfect for those golden hour moments.',
      image: '/perfume3-removebg-preview.png'
    },
    {
      id: 7,
      name: 'Arcadia Musk',
      size: '100ml',
      price: '$95.00',
      inStock: true,
      description: 'A sophisticated blend of musk and soft florals that creates an aura of timeless elegance. The musk provides a sensual, skin-like quality while soft florals add refinement and grace. This fragrance is both modern and classic, perfect for those who appreciate understated luxury.',
      image: '/Arcadia20620Musk-removebg-preview.png'
    },
    // Body Products
    {
      id: 101,
      name: 'Body Lotion',
      size: '250ml',
      price: '$45.00',
      inStock: true,
      description: 'Nourishing body lotion infused with natural ingredients for silky smooth skin. This luxurious formula deeply hydrates and softens your skin, leaving it feeling supple and beautifully scented. Enriched with natural oils and botanical extracts, it provides long-lasting moisture while maintaining the elegant fragrance of our signature scents.',
      image: '/body_product-removebg-preview.png'
    },
    {
      id: 102,
      name: 'Body Wash',
      size: '300ml',
      price: '$38.00',
      inStock: true,
      description: 'Gentle cleansing body wash with aromatic fragrances for a luxurious shower experience. This rich, creamy formula cleanses while nourishing your skin, leaving it feeling refreshed and delicately scented. Perfect for daily use, it transforms your shower into a spa-like experience with our signature fragrance notes.',
      image: '/body_product1-removebg-preview.png'
    },
    {
      id: 103,
      name: 'Body Oil',
      size: '100ml',
      price: '$52.00',
      inStock: true,
      description: 'Hydrating body oil that leaves your skin glowing and beautifully scented. This luxurious oil absorbs quickly without leaving a greasy residue, providing intense hydration and a radiant glow. Infused with our signature fragrance, it creates a lasting, elegant scent that lingers throughout the day.',
      image: '/body_product2-removebg-preview.png'
    },
    {
      id: 104,
      name: 'Body Scrub',
      size: '200ml',
      price: '$42.00',
      inStock: true,
      description: 'Exfoliating body scrub to reveal soft, radiant skin with every use. This gentle yet effective scrub removes dead skin cells while nourishing with natural ingredients. The fine exfoliating particles work to smooth and refine your skin texture, leaving it feeling silky and refreshed with a subtle, elegant fragrance.',
      image: '/body_product-removebg-preview.png'
    }
  ];

  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="not-found">
          <h2>Product not found</h2>
          <Link to="/shop">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedNotification(true);
    // Hide notification after 2 seconds and navigate to cart
    setTimeout(() => {
      setShowAddedNotification(false);
      navigate('/cart');
    }, 2000);
  };

  return (
    <div className="product-detail-page">
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

      {/* Success Notification */}
      {showAddedNotification && (
        <div className="add-to-cart-notification">
          <div className="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Item added to cart!</span>
          </div>
        </div>
      )}

      {/* Product Content */}
      <main className="product-detail-main">
        <div className="product-detail-container">
          <div className="product-detail-grid">
            {/* Left Column - Product Details */}
            <div className="product-details">
              <h1 className="product-detail-name">{product.name}</h1>
              <p className="product-detail-size">{product.size}</p>
              <p className="product-detail-price">{product.price}</p>
              
              {product.inStock && (
                <div className="stock-badge">
                  <span>In Stock</span>
                </div>
              )}

              <div className="quantity-cart-row">
                <div className="quantity-selector">
                  <button 
                    className="quantity-button" 
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-button" 
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>

              {/* Description Section */}
              <div className="product-description-section">
                <h2 className="description-title">Description</h2>
                <p className="description-text">{product.description}</p>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div className="product-image-section">
              <div className="product-detail-image-container">
                <img src={product.image} alt={product.name} className="product-detail-image" />
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

export default ProductDetail;

