import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { useCart } from '../../services/CartContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Simplified language options for artisans
  const languages = [
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Helper function to check if current page is active
  const isActivePage = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Get nav link style with active state - larger touch targets for mobile
  const getNavLinkStyle = (path) => ({
    color: 'var(--nav-text)', 
    textDecoration: 'none', 
    padding: '12px 16px', // Larger touch targets
    fontSize: 'clamp(1rem, 3vw, 1.1rem)', // Larger text
    whiteSpace: 'nowrap',
    borderRadius: '6px',
    backgroundColor: isActivePage(path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    border: 'none',
    transition: 'all 0.2s ease',
    position: 'relative',
    minHeight: '44px', // Touch-friendly minimum
    display: 'flex',
    alignItems: 'center',
    fontWeight: isActivePage(path) ? '600' : '400'
  });

  return (
    <nav className="nav-responsive" style={{
      backgroundColor: 'var(--nav-background)',
      padding: '12px 20px', // Increased padding
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: '0',
      zIndex: 'var(--z-sticky)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      maxWidth: '100vw'
    }}>
      {/* Brand - Simplified */}
      <div style={{ flex: '0 0 auto' }}>
        <Link 
          to="/" 
          style={{ 
            color: 'var(--nav-text)',
            textDecoration: 'none', 
            fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🏺 Kalaikatha
        </Link>
      </div>

      {/* Navigation Links - Responsive */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'clamp(8px, 2vw, 16px)', // Responsive gap
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        flex: '1'
      }}>
        {/* Language Selector - Simplified */}
        <div className="dropdown-container" style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            style={{ 
              color: 'var(--nav-text)', 
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              outline: 'none',
              transition: 'all 0.2s ease',
              minHeight: '40px'
            }}
          >
            {languages.find(lang => lang.code === selectedLanguage)?.flag} 
            {languages.find(lang => lang.code === selectedLanguage)?.name.slice(0, 3)}
            <span style={{ fontSize: '12px' }}>▼</span>
          </button>
          
          {showLanguageDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 1000,
              minWidth: '140px',
              marginTop: '4px',
              overflow: 'hidden'
            }}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setSelectedLanguage(language.code);
                    setShowLanguageDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: selectedLanguage === language.code ? '#f0f0f0' : 'white',
                    color: '#333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedLanguage !== language.code) {
                      e.target.style.background = '#f8f8f8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLanguage !== language.code) {
                      e.target.style.background = 'white';
                    }
                  }}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Link to="/" style={getNavLinkStyle('/')}>
          🏠 Home
        </Link>
        
        <Link to="/products" style={getNavLinkStyle('/products')}>
          🛍️ Products
        </Link>
        
        {user ? (
          <>
            <Link to="/dashboard" style={getNavLinkStyle('/dashboard')}>
              📊 Dashboard
            </Link>
            
            <Link 
              to="/cart" 
              style={{
                ...getNavLinkStyle('/cart'),
                backgroundColor: state.items.length > 0 ? 'rgba(255, 255, 255, 0.3)' : getNavLinkStyle('/cart').backgroundColor,
                position: 'relative'
              }}
            >
              🛒 Cart {state.items.length > 0 && `(${state.items.length})`}
            </Link>
            
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--nav-text)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                minHeight: '40px'
              }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: 'var(--secondary-color)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            🔑 Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;