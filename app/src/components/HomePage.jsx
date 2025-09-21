// Enhanced HomePage with Voice-First Design matching the attached screenshots
import React from 'react'

const HomePage = ({ onNavigate, t, currentLang, speak }) => {
  const handleNavigation = (page, spokenText) => {
    onNavigate(page)
    speak(spokenText)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#2c3e50' // Dark blue-gray background like in the screenshot
    }}>
      {/* Header Navigation matching the screenshot design */}
      <header style={{
        background: 'linear-gradient(135deg, #e67e22, #d35400)', // Warm coral/orange gradient
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Logo Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🏺</span>
            <h1 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              {t('appName')}
            </h1>
          </div>

          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <button
              onClick={() => handleNavigation('home', t('home'))}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              <span>🏠</span> {t('home')}
            </button>
            
            <button
              onClick={() => handleNavigation('ai-tools', t('products'))}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              <span>🛍️</span> {t('products')}
            </button>
            
            <button
              onClick={() => handleNavigation('login', t('login'))}
              style={{
                background: 'white',
                color: '#e67e22',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f8f9fa'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span>✏️</span> {t('login')}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section matching the screenshot */}
      <section style={{
        background: 'linear-gradient(135deg, #ff9a8b, #fad0c4)', // Warm coral gradient
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Welcome to {t('appName')}
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            {t('tagline')}
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => handleNavigation('ai-tools', t('exploreProducts'))}
              style={{
                background: 'white',
                color: '#e67e22',
                padding: '1rem 2rem',
                borderRadius: '25px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              {t('exploreProducts')}
            </button>
            
            <button
              onClick={() => handleNavigation('login', t('sellCreations'))}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '25px',
                border: '2px solid white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'white'
                e.target.style.color = '#e67e22'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)'
                e.target.style.color = 'white'
              }}
            >
              {t('sellCreations')}
            </button>
          </div>
        </div>
      </section>

      {/* AI Tools Section matching the screenshot */}
      <section style={{
        padding: '4rem 2rem',
        background: '#2c3e50'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              {t('aiTools')}
            </h2>
          </div>

          {/* AI Tools Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Content Generator */}
            <div 
              style={{
                background: '#34495e',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #4a5f7a'
              }}
              onClick={() => handleNavigation('ai-tools', 'Content Generator')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🛎️
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                marginBottom: '0.5rem'
              }}>
                Content Generator
              </h3>
              <p style={{
                color: '#bdc3c7',
                lineHeight: 1.5
              }}>
                AI-powered descriptions for your handcrafted products
              </p>
            </div>

            {/* Image Enhancer */}
            <div 
              style={{
                background: '#34495e',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #4a5f7a'
              }}
              onClick={() => handleNavigation('ai-tools', 'Image Enhancer')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🖼️
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                marginBottom: '0.5rem'
              }}>
                Image Enhancer
              </h3>
              <p style={{
                color: '#bdc3c7',
                lineHeight: 1.5
              }}>
                Professional quality photos with AI enhancement
              </p>
            </div>

            {/* Pricing Assistant */}
            <div 
              style={{
                background: '#34495e',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid #4a5f7a'
              }}
              onClick={() => handleNavigation('ai-tools', 'Pricing Assistant')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                💰
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                marginBottom: '0.5rem'
              }}>
                Pricing Assistant
              </h3>
              <p style={{
                color: '#bdc3c7',
                lineHeight: 1.5
              }}>
                Smart pricing recommendations based on market analysis
              </p>
            </div>
          </div>

          {/* Voice Command Instructions */}
          <div style={{
            background: 'rgba(52, 73, 94, 0.5)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            border: '1px dashed #5a6c7d'
          }}>
            <p style={{
              color: '#ecf0f1',
              margin: 0,
              fontSize: '1rem'
            }}>
              💡 <strong>Voice Commands:</strong> Say "Home", "AI Tools", "Login", or "User Flow" to navigate. 
              Say "Hindi" or "English" to change language. Try the voice button! 🎤
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage