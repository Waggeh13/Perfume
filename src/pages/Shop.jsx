import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/Shop.css';

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentPerfumeIndex, setCurrentPerfumeIndex] = useState(0);
  const [currentBodyProductIndex, setCurrentBodyProductIndex] = useState(0);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  const perfumes = [
    {
      id: 1,
      name: 'Velour Mist',
      description: 'Soft and captivating - a blend of white florals and warm musk that lingers like silk on the skin.',
      price: '$72.00',
      image: '/perfume-removebg-preview (1).png'
    },
    {
      id: 2,
      name: 'Eclat d\'Aube',
      description: '(Glow of Dawn) - a radiant mix of citrus and amber, inspired by the quiet elegance of early morning light.',
      price: '$83.00',
      image: '/perfume10-removebg-preview.png'
    },
    {
      id: 3,
      name: 'Whispered Iris',
      description: 'Delicate yet confident - notes of iris and vanilla wrapped in subtle wood, a scent that speaks in whispers.',
      price: '$90.00',
      image: '/perfume4-removebg-preview.png'
    },
    {
      id: 4,
      name: 'Noir Amara',
      description: 'Darkly elegant - amber, patchouli, and rose intertwined in a sensual harmony of mystery and grace.',
      price: '$65.00',
      image: '/perfume9-removebg-preview.png'
    },
    {
      id: 5,
      name: 'Midnight Bloom',
      description: 'A mysterious blend of dark florals and rich vanilla that captivates the senses.',
      price: '$88.00',
      image: '/perfume2-removebg-preview.png'
    },
    {
      id: 6,
      name: 'Sunset Serenade',
      description: 'Warm and inviting - notes of amber, sandalwood, and a hint of citrus create an unforgettable evening scent.',
      price: '$75.00',
      image: '/perfume3-removebg-preview.png'
    },
    {
      id: 7,
      name: 'Arcadia Musk',
      description: 'A sophisticated blend of musk and soft florals that creates an aura of timeless elegance.',
      price: '$95.00',
      image: '/Arcadia20620Musk-removebg-preview.png'
    }
  ];

  const bodyProducts = [
    {
      id: 101,
      name: 'Body Lotion',
      description: 'Nourishing body lotion infused with natural ingredients for silky smooth skin.',
      price: '$45.00',
      image: '/body_product-removebg-preview.png'
    },
    {
      id: 102,
      name: 'Body Wash',
      description: 'Gentle cleansing body wash with aromatic fragrances for a luxurious shower experience.',
      price: '$38.00',
      image: '/body_product1-removebg-preview.png'
    },
    {
      id: 103,
      name: 'Body Oil',
      description: 'Hydrating body oil that leaves your skin glowing and beautifully scented.',
      price: '$52.00',
      image: '/body_product2-removebg-preview.png'
    },
    {
      id: 104,
      name: 'Body Scrub',
      description: 'Exfoliating body scrub to reveal soft, radiant skin with every use.',
      price: '$42.00',
      image: '/body_product-removebg-preview.png'
    }
  ];

  const nextPerfume = () => {
    const maxIndex = Math.max(0, perfumes.length - 3);
    setCurrentPerfumeIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevPerfume = () => {
    const maxIndex = Math.max(0, perfumes.length - 3);
    setCurrentPerfumeIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextBodyProduct = () => {
    const maxIndex = Math.max(0, bodyProducts.length - 3);
    setCurrentBodyProductIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevBodyProduct = () => {
    const maxIndex = Math.max(0, bodyProducts.length - 3);
    setCurrentBodyProductIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // Add default size and other required fields
    const productWithDetails = {
      ...product,
      size: product.id >= 100 ? '250ml' : '100ml',
      inStock: true,
      description: product.description
    };
    addToCart(productWithDetails, 1);
    setAddedProductName(product.name);
    setShowAddedNotification(true);
    setTimeout(() => {
      setShowAddedNotification(false);
    }, 2000);
  };

  return (
    <div className="shop-page">
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
            <span>{addedProductName} added to cart!</span>
          </div>
        </div>
      )}

      {/* Shop Banner */}
      <section className="shop-banner">
        <div className="shop-banner-overlay"></div>
        <img src="/shopbanner.png" alt="All Collections" className="shop-banner-image" />
        <div className="shop-banner-content">
          <h1 className="shop-banner-title">ALL COLLECTIONS</h1>
        </div>
      </section>

      <main className="shop-main">
        {/* Perfumes Carousel Section */}
        <section className="shop-section perfumes-section">
          <h2 className="section-title">Perfumes</h2>
          <div className="carousel-container">
            <button className="carousel-button carousel-button-prev" onClick={prevPerfume} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="carousel-wrapper">
              <div 
                className="carousel-track carousel-track-3" 
                style={{ transform: `translateX(-${currentPerfumeIndex * 33.33}%)` }}
              >
                {perfumes.map((perfume) => (
                  <div key={perfume.id} className="carousel-slide carousel-slide-3">
                    <Link to={`/product/${perfume.id}`} className="product-card-link">
                      <div className="product-card">
                        <div className="product-image-container">
                          <img src={perfume.image} alt={perfume.name} className="product-image" />
                        </div>
                        <h3 className="product-name">{perfume.name}</h3>
                        <p className="product-description">{perfume.description}</p>
                        <div className="product-footer">
                          <span className="product-price">{perfume.price}</span>
                          <button className="cart-icon-button" aria-label="Add to cart" onClick={(e) => handleAddToCart(e, perfume)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                              <line x1="3" y1="6" x2="21" y2="6"></line>
                              <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-button carousel-button-next" onClick={nextPerfume} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          <div className="carousel-dots">
            {Array.from({ length: Math.max(1, perfumes.length - 2) }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentPerfumeIndex ? 'active' : ''}`}
                onClick={() => setCurrentPerfumeIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Body Products Section */}
        <section className="shop-section body-products-section">
          <h2 className="section-title">Body Products</h2>
          <div className="carousel-container">
            <button className="carousel-button carousel-button-prev" onClick={prevBodyProduct} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="carousel-wrapper">
              <div 
                className="carousel-track carousel-track-3" 
                style={{ transform: `translateX(-${currentBodyProductIndex * 33.33}%)` }}
              >
                {bodyProducts.map((product) => (
                  <div key={product.id} className="carousel-slide carousel-slide-3">
                    <Link to={`/product/${product.id}`} className="product-card-link">
                      <div className="product-card">
                        <div className="product-image-container">
                          <img src={product.image} alt={product.name} className="product-image" />
                        </div>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <div className="product-footer">
                          <span className="product-price">{product.price}</span>
                          <button className="cart-icon-button" aria-label="Add to cart" onClick={(e) => handleAddToCart(e, product)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                              <line x1="3" y1="6" x2="21" y2="6"></line>
                              <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button className="carousel-button carousel-button-next" onClick={nextBodyProduct} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          <div className="carousel-dots">
            {Array.from({ length: Math.max(1, bodyProducts.length - 2) }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentBodyProductIndex ? 'active' : ''}`}
                onClick={() => setCurrentBodyProductIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
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

export default Shop;

