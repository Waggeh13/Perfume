import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartIcon from '../components/CartIcon';
import '../styles/pages/Search.css';

const Search = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  const allProducts = [
    // Perfumes
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
    },
    // Body Products
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

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  const handleAddToCart = (product) => {
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
    <div className="search-page">
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

      {/* Search Section */}
      <main className="search-main">
        <div className="search-container">
          <h1 className="search-title">Search Products</h1>
          <div className="search-input-wrapper">
            <svg className="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
          </div>

          {searchQuery && (
            <p className="search-results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
            </p>
          )}

          {/* Products Grid */}
          <div className="search-products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="search-product-card-link">
                  <div className="search-product-card">
                    <div className="search-product-image-container">
                      <img src={product.image} alt={product.name} className="search-product-image" />
                    </div>
                    <h3 className="search-product-name">{product.name}</h3>
                    <p className="search-product-description">{product.description}</p>
                    <div className="search-product-footer">
                      <span className="search-product-price">{product.price}</span>
                      <button 
                        className="cart-icon-button" 
                        aria-label="Add to cart" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : searchQuery ? (
              <div className="no-results">
                <p>No products found matching "{searchQuery}"</p>
                <p className="no-results-suggestion">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="no-results">
                <p>Start typing to search for fragrances and body products</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;

