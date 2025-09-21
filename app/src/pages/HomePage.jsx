import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStickyNavbar } from '../hooks/useStickyNavbar';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const isSticky = useStickyNavbar(200); // Use the custom hook

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'mr', name: 'मराठी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = langCode => {
    setSelectedLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="landing-container">
      {/* Sticky Navigation Bar */}
      {/* The 'sticky' class is now applied conditionally */}
      <nav className={`landing-nav ${isSticky ? 'sticky' : ''}`}>
        <div className="nav-content">
          <div className="logo">🏺 Kalaikatha</div>
          <div className="nav-right">
            <div className="language-selector">
              <button
                className="language-toggle"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                aria-label="Select language"
              >
                <span className="lang-name">{currentLanguage.name}</span>
                <span className="globe-icon">🌐</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showLanguageDropdown && (
                <div className="language-dropdown">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`language-option ${
                        lang.code === selectedLanguage ? 'selected' : ''
                      }`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span className="lang-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="nav-btn"
              onClick={() => navigate('/dashboard')}
            >
              🏺 For Artisans
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          {/* Hero Image Background */}
          <div className="hero-image">👐</div>

          {/* Main Content */}
          <div className="content-wrapper">
            <h1 className="hero-headline">
              Your Art, Your Story, Your Success
            </h1>
            <p className="hero-description">
              Let's build a digital home for your craft. It's as simple as a
              conversation.
            </p>

            {/* Call to Action Buttons */}
            <div className="cta-buttons">
              <button
                className="get-started-btn"
                onClick={() => navigate('/signup')}
                aria-label="Get started with Kalaikatha"
              >
                Get Started
              </button>
              <button
                className="returning-user-btn"
                onClick={() => navigate('/signin')}
                aria-label="Sign in as returning user"
              >
                I've Been Here Before
              </button>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <section className="features-overview">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">💡</div>
              <h3>AI-Powered Content Creation</h3>
              <p>
                Let AI help tell your craft's story with compelling descriptions
                and narratives
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3>Visual Enhancement for Crafts</h3>
              <p>
                Transform your photos with AI-powered enhancement and
                professional presentation
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>Collaborate with Fellow Artisans</h3>
              <p>
                Connect with other craftspeople and discover new partnership
                opportunities
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;