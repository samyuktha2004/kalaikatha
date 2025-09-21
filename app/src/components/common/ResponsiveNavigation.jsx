import React, { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResponsiveNavigation = memo(({ user, selectedLanguage, onLanguageChange, languages }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: isScrolled 
      ? 'var(--nav-background)' 
      : 'var(--nav-background)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--nav-border)',
    transition: 'all 0.3s ease',
    boxShadow: isScrolled 
      ? '0 2px 20px rgba(0, 0, 0, 0.1)' 
      : '0 1px 10px rgba(0, 0, 0, 0.05)'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-md) var(--container-padding)',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const brandStyle = {
    fontSize: 'var(--text-xl)',
    fontWeight: 'bold',
    color: 'var(--nav-text)',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  const hamburgerStyle = {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '30px',
    height: '30px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  };

  const hamburgerLineStyle = {
    width: '100%',
    height: '3px',
    background: 'var(--nav-text)',
    borderRadius: '3px',
    transition: 'all 0.3s ease',
    transformOrigin: '1px'
  };

  const menuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: 'var(--nav-text)',
    textDecoration: 'none',
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: 'var(--text-base)',
    fontWeight: '500'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'var(--nav-link-active)',
    color: 'var(--nav-text)'
  };

  const mobileMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'var(--nav-background)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: 'var(--space-lg)',
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isMenuOpen ? 1 : 0,
    visibility: isMenuOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease'
  };

  const languageSelectStyle = {
    padding: 'var(--space-sm) var(--space-md)',
    border: '2px solid var(--nav-border)',
    borderRadius: '8px',
    background: 'var(--nav-background)',
    color: 'var(--nav-text)',
    fontSize: 'var(--text-sm)',
    cursor: 'pointer',
    minWidth: '120px'
  };

  return (
    <nav className="responsive-nav" style={navStyle}>
      <div style={containerStyle}>
        {/* Brand */}
        <Link to="/" style={brandStyle}>
          Kalaikatha
        </Link>

        {/* Desktop Menu */}
        <ul style={{ ...menuStyle, display: window.innerWidth >= 768 ? 'flex' : 'none' }}>
          <li>
            <Link 
              to="/" 
              style={location.pathname === '/' ? activeLinkStyle : linkStyle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/ai-tools/dashboard" 
              style={location.pathname.includes('ai-tools') ? activeLinkStyle : linkStyle}
            >
              AI Tools
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link 
                  to="/my-products" 
                  style={location.pathname === '/my-products' ? activeLinkStyle : linkStyle}
                >
                  My Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/orders" 
                  style={location.pathname === '/orders' ? activeLinkStyle : linkStyle}
                >
                  Orders
                </Link>
              </li>
            </>
          )}
          <li>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              style={languageSelectStyle}
              aria-label="Select Language"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </li>
          {!user ? (
            <li>
              <Link 
                to="/auth/login" 
                style={{
                  ...linkStyle,
                  background: 'var(--nav-link-active)',
                  color: 'var(--nav-text)'
                }}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {/* Add logout logic */}}
                className="btn btn-secondary btn-sm"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          style={{ 
            ...hamburgerStyle, 
            display: window.innerWidth < 768 ? 'flex' : 'none' 
          }}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="hamburger"
        >
          <div style={{
            ...hamburgerLineStyle,
            transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0)'
          }}></div>
          <div style={{
            ...hamburgerLineStyle,
            opacity: isMenuOpen ? 0 : 1
          }}></div>
          <div style={{
            ...hamburgerLineStyle,
            transform: isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'
          }}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle} className="mobile-menu">
        <ul style={{ ...menuStyle, flexDirection: 'column', gap: 'var(--space-md)' }}>
          <li>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/ai-tools/dashboard" style={linkStyle}>
              AI Tools
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/my-products" style={linkStyle}>
                  My Products
                </Link>
              </li>
              <li>
                <Link to="/orders" style={linkStyle}>
                  Orders
                </Link>
              </li>
            </>
          )}
          <li>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              style={{ ...languageSelectStyle, width: '100%' }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </li>
          {!user ? (
            <li>
              <Link 
                to="/auth/login" 
                style={{
                  ...linkStyle,
                  background: 'var(--nav-link-active)',
                  color: 'var(--nav-text)',
                  textAlign: 'center',
                  display: 'block'
                }}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {/* Add logout logic */}}
                style={{
                  ...linkStyle,
                  background: 'transparent',
                  border: '2px solid var(--nav-text)',
                  color: 'var(--nav-text)',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
});

export default ResponsiveNavigation;