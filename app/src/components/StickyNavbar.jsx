import React from 'react';
import { useStickyNavbar } from '../hooks/useStickyNavbar';

/**
 * Reusable Sticky Navigation Bar component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.selectedLanguage - Currently selected language
 * @param {Function} props.setSelectedLanguage - Language change handler
 * @param {boolean} props.showLanguageDropdown - Language dropdown visibility
 * @param {Function} props.setShowLanguageDropdown - Language dropdown toggle handler
 * @param {Array} props.languages - Available languages array
 * @param {Array} props.navItems - Navigation items to display
 */
const StickyNavbar = ({ 
  onNavigate, 
  selectedLanguage = 'en',
  setSelectedLanguage,
  showLanguageDropdown = false,
  setShowLanguageDropdown,
  languages = [],
  navItems = []
}) => {
  const isSticky = useStickyNavbar(200); // Becomes sticky after scrolling 200px

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || { name: 'English' };

  const handleLanguageSelect = (langCode) => {
    if (setSelectedLanguage) {
      setSelectedLanguage(langCode);
    }
    if (setShowLanguageDropdown) {
      setShowLanguageDropdown(false);
    }
  };

  return (
    <nav className={`landing-nav ${isSticky ? 'sticky' : ''}`}>
      <div className="nav-content">
        <div className="logo" onClick={() => onNavigate && onNavigate('home')}>
          🏺 Kalaikatha
        </div>
        <div className="nav-right">
          {/* Language Selector */}
          {languages.length > 0 && (
            <div className="language-selector">
              <button 
                className="language-toggle"
                onClick={() => setShowLanguageDropdown && setShowLanguageDropdown(!showLanguageDropdown)}
                aria-label="Select language"
              >
                <span className="lang-name">{currentLanguage.name}</span>
                <span className="globe-icon">🌐</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showLanguageDropdown && (
                <div className="language-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${lang.code === selectedLanguage ? 'selected' : ''}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span className="lang-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Navigation Items */}
          {navItems.map((item, index) => (
            <button 
              key={index}
              className="nav-btn"
              onClick={() => onNavigate && onNavigate(item.route)}
            >
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;