import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/customer-home.css';

const CustomerHomePage = () => {
  const [selectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [isSticky, setSticky] = React.useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Localization function
  const getLocalizedText = () => {
    const texts = {
      'en': {
        welcome: 'Welcome to Kalaikatha',
        subtitle: 'Empowering Indian Artisans with AI',
        exploreProducts: 'Explore Products',
        aiTools: 'AI Tools',
        sellProducts: 'Sell Your Creations',
        voiceAssistant: 'Voice Assistant',
        dashboard: 'Business Dashboard'
      },
      'hi': {
        welcome: 'कलाकथा में आपका स्वागत है',
        subtitle: 'एआई के साथ भारतीय कारीगरों को सशक्त बनाना',
        exploreProducts: 'उत्पाद देखें',
        aiTools: 'एआई उपकरण',
        sellProducts: 'अपनी कृतियां बेचें',
        voiceAssistant: 'आवाज सहायक',
        dashboard: 'व्यापार डैशबोर्ड'
      }
    };
    return texts[selectedLanguage] || texts['en'];
  };

  const text = getLocalizedText();

  // Enhanced voice button with better responsiveness
  const VoiceButton = () => (
    <Link 
      to="/ai-tools/voice-assistant"
      className="voice-button-floating"
      aria-label="Voice Assistant"
    >
      🎤
    </Link>
  );

  return (
    <div className="customer-home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {text.welcome}
          </h1>
          <p className="hero-subtitle">
            {text.subtitle}
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary-hero">
              {text.exploreProducts}
            </Link>
            <Link to="/login" className="btn-secondary-hero">
              {text.sellProducts}
            </Link>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="ai-tools-section">
        <h2 className="section-title">
          {text.aiTools}
        </h2>
        <div className="ai-tools-grid">
          <Link to="/ai-tools/content-generator" className="ai-tool-card">
            <div className="ai-tool-icon">✍️</div>
            <h3 className="ai-tool-title">Content Generator</h3>
          </Link>
          
          <Link to="/ai-tools/image-enhancer" className="ai-tool-card">
            <div className="ai-tool-icon">🖼️</div>
            <h3 className="ai-tool-title">Image Enhancer</h3>
          </Link>
          
          <Link to="/ai-tools/pricing-assistant" className="ai-tool-card">
            <div className="ai-tool-icon">💰</div>
            <h3 className="ai-tool-title">Pricing Assistant</h3>
          </Link>
        </div>
      </section>

      {/* Voice Assistant Button */}
      <VoiceButton />

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">Loading...</div>
        </div>
      )}
  );
};

export default CustomerHomePage;