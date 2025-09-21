import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firestore';
import { useCart } from '../../services/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import StickyNavbar from '../../components/StickyNavbar';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { addItem } = useCart();

  const categories = [
    'pottery',
    'woodwork', 
    'textiles',
    'glasswork',
    'metalwork',
    'jewelry',
    'painting',
    'sculpture',
    'other'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await firestore.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.artisan && product.artisan.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading products...</div>;

  return (
    <div>
      <StickyNavbar 
        onNavigate={navigate}
        navItems={[
          { label: 'Home', route: '/', icon: '🏠' },
          { label: 'Cart', route: '/cart', icon: '🛒' },
          { label: 'Orders', route: '/orders', icon: '📦' },
          { label: 'Profile', route: '/profile', icon: '👤' }
        ]}
      />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2>All Products</h2>
        <p>Discover handcrafted items from talented artisans</p>
      </div>

      {/* Filters Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '30px'
      }}>
        <h3 style={{ marginTop: 0 }}>Filters</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          {/* Search */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Min Price ($)
            </label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              placeholder="0"
              min="0"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Max Price ($)
            </label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              placeholder="1000"
              min="0"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Clear Filters */}
          <div>
            <button
              onClick={clearFilters}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#666' }}>
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          border: '2px dashed #ddd',
          borderRadius: '8px'
        }}>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}>
              {/* Product Image */}
              <div style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{ color: '#666', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎨</div>
                    <p>No Image</p>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  {product.category && (
                    <span style={{
                      backgroundColor: '#e9ecef',
                      color: '#495057',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {product.category}
                    </span>
                  )}
                </div>

                <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {product.name}
                  </Link>
                </h4>

                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.description}
                </p>

                {product.artisan && (
                  <p style={{ fontSize: '12px', color: '#888', marginBottom: '15px' }}>
                    by {product.artisan}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#2c5aa0'
                  }}>
                    ${product.price}
                  </span>

                  <button
                    onClick={() => addItem(product)}
                    style={{
                      backgroundColor: '#2c5aa0',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductsPage;