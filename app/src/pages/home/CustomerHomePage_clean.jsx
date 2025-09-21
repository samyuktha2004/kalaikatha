import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomerHomePage = () => {
  const [selectedLanguage] = useState('en-IN');
  const [isLoading, setIsLoading] = useState(true);

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
      }
    };
    return texts[selectedLanguage] || texts['en-IN'];
  };

  const text = getLocalizedText();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading Kalaikatha...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #E57373, #F8BBD9)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderRadius: '12px',
        margin: '2rem 0'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {text.welcome}
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
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
              backgroundColor: 'white',
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          padding: '1rem'
        }}>
          <Link to="/ai-tools/content-generator" style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'block'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <h3>Content Generator</h3>
          </Link>
          
          <Link to="/ai-tools/image-enhancer" style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'block'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
            <h3>Image Enhancer</h3>
          </Link>
          
          <Link to="/ai-tools/pricing-assistant" style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'block'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
            <h3>Pricing Assistant</h3>
          </Link>
          
          <Link to="/ai-tools/voice-assistant" style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'block'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎤</div>
            <h3>Voice Assistant</h3>
          </Link>
        </div>
      </section>

      {/* Quick Navigation */}
      <section style={{ margin: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem', color: '#333' }}>Quick Navigation</h2>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/products" style={{
            backgroundColor: '#E57373',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            View Products
          </Link>
          <Link to="/dashboard" style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Dashboard
          </Link>
          <Link to="/cart" style={{
            backgroundColor: '#FF9800',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Shopping Cart
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CustomerHomePage;