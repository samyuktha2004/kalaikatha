import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AIToolsGrid from '../../components/common/AIToolsGrid';
import ColorPaletteDemo from '../../components/common/ColorPaletteDemo';
import { 
  useResponsiveGridColumns 
} from '../../utils/ResponsiveHooks';
import '../../styles/responsive-enhanced.css';

const CustomerHomePage = () => {
  const [selectedLanguage] = useState('en-IN');
  const [isLoading, setIsLoading] = useState(true);

  // Use responsive hooks
  const gridColumns = useResponsiveGridColumns({
    mobile: 1,
    mobileLarge: 1,
    tablet: 2,
    laptop: 3,
    desktop: 4
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Localization function
  const getLocalizedText = () => {
    const texts = {
      'en-IN': {
        welcome: 'Welcome to Kalaikatha',
        subtitle: 'Empowering Indian Artisans with AI',
        exploreProducts: 'Explore Products',
        aiTools: 'AI Tools',
        sellProducts: 'Sell Your Creations',
        voiceAssistant: 'Voice Assistant',
        dashboard: 'Business Dashboard'
      },
      'hi-IN': {
        welcome: 'कलाकथा में आपका स्वागत है',
        subtitle: 'एआई के साथ भारतीय कारीगरों को सशक्त बनाना',
        exploreProducts: 'उत्पाद देखें',
        aiTools: 'एआई उपकरण',
        sellProducts: 'अपनी कृतियां बेचें',
        voiceAssistant: 'आवाज सहायक',
        dashboard: 'व्यापार डैशबोर्ड'
      }
    };
    return texts[selectedLanguage] || texts['en-IN'];
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
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #E57373, #F8BBD9)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderRadius: '12px',
        margin: '2rem 0'
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
          {text.welcome}
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', marginBottom: '2rem' }}>
          {text.subtitle}
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/products" 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#E57373',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            {text.exploreProducts}
          </Link>
          <Link 
            to="/login" 
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            {text.sellProducts}
          </Link>
        </div>
      </section>

      {/* AI Tools Section */}
      <section style={{ margin: '3rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          {text.aiTools}
        </h2>
        <AIToolsGrid />
      </section>

      {/* Color Palette Demo */}
      <section style={{ margin: '3rem 0' }}>
        <ColorPaletteDemo />
      </section>

      {/* Voice Assistant Button */}
      <VoiceButton />

      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default CustomerHomePage;