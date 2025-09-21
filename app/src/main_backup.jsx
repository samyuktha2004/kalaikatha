import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple Voice Recognition Hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = React.useState(false)
  const [voiceText, setVoiceText] = React.useState('')

  const startListening = () => {
    setIsListening(true)
    console.log('Voice listening started')
  }

  const stopListening = () => {
    setIsListening(false)
    console.log('Voice listening stopped')
  }

  return { isListening, startListening, stopListening, voiceText }
}

// Enhanced Landing Page (Combined Home + Onboarding)
const HomePage = ({ onNavigate }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('en')
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false)
  const [isSticky, setSticky] = React.useState(false)
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ]
  
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage)
  
  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode)
    setShowLanguageDropdown(false)
  }

  // Effect to handle the sticky navigation
  React.useEffect(() => {
    const handleScroll = () => {
      // Set sticky to true if user scrolls down more than 10px
      setSticky(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <div className="landing-container">
      {/* Sticky Navigation Bar */}
       {/* The 'sticky' class is now applied conditionally */}
      <nav className={`landing-nav ${isSticky ? 'sticky' : ''}`}>
        <div className="nav-content">
          <div className="logo">
            🏺 Kalaikatha
          </div>
          <div className="nav-right">
            <div className="language-selector">
              <button 
                className="language-toggle"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                aria-label="Select language"
              >
                <span className="flag">{currentLanguage.flag}</span>
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
                      <span className="flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              className="nav-btn"
              onClick={() => onNavigate('dashboard')}
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
          <div className="hero-image">
            👐
          </div>
          
          {/* Main Content */}
          <div className="content-wrapper">
            <h1 className="hero-headline">Your Art, Your Story, Your Success</h1>
            <p className="hero-description">
              Let's build a digital home for your craft. It's as simple as a conversation.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="cta-buttons">
              <button 
                className="get-started-btn"
                onClick={() => onNavigate('signup')}
                aria-label="Get started with Kalaikatha"
              >
                Get Started
              </button>
              <button 
                className="returning-user-btn"
                onClick={() => onNavigate('signin')}
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
              <p>Let AI help tell your craft's story with compelling descriptions and narratives</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3>Visual Enhancement for Crafts</h3>
              <p>Transform your photos with AI-powered enhancement and professional presentation</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>Collaborate with Fellow Artisans</h3>
              <p>Connect with other craftspeople and discover new partnership opportunities</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Enhanced Artisan Dashboard Component
const ArtisanDashboard = ({ onNavigate, userName = "Priya" }) => {
  const [isSticky, setSticky] = React.useState(false);

  // Effect to handle the sticky navigation shadow
  React.useEffect(() => {
    const handleScroll = () => {
      // Set sticky to true if user scrolls down more than 10px
      setSticky(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <header className={`dashboard-header ${isSticky ? 'sticky' : ''}`} role="banner">
        <div className="header-left">
          <button 
            className="logo" 
            onClick={() => onNavigate('home')}
            aria-label="Kalaikatha - Traditional Crafts Platform - Go to Home"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            🏺 Kalaikatha
          </button>
        </div>
        <div className="header-right">
          <button 
            className="notification-icon" 
            aria-label="View notifications"
            title="Notifications"
          >
            🔔
          </button>
          <div className="user-profile" role="button" tabIndex="0" aria-label={`User profile: ${userName}`}>
            <div className="avatar" aria-hidden="true">👤</div>
            <span className="user-name">{userName}</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-main" role="main">
        {/* Welcome Headline */}
        <div className="welcome-section">
          <h1 className="welcome-headline">
            Welcome back, {userName}! What would you like to do today?
          </h1>
        </div>

        {/* Primary Action Buttons */}
        <div className="action-buttons" role="region" aria-label="Main dashboard actions">
          {/* Add New Craft Button */}
          <button 
            className="action-btn primary-btn"
            onClick={() => onNavigate('add-craft')}
            aria-label="Add new craft - Create and showcase your latest creation"
          >
            <div className="btn-icon" aria-hidden="true">
              <div className="plus-icon">+</div>
              <div className="craft-illustration">🏺</div>
            </div>
            <div className="btn-content">
              <h3>Add New Craft</h3>
              <p>Create and showcase your latest creation</p>
            </div>
          </button>

          {/* My Crafts Button */}
          <button 
            className="action-btn secondary-btn"
            onClick={() => onNavigate('dashboard')}
            aria-label="My crafts - Manage your existing creations"
          >
            <div className="btn-icon" aria-hidden="true">
              <div className="gallery-icon">
                <span className="item">🏺</span>
                <span className="item">🧶</span>
                <span className="item">🎨</span>
              </div>
            </div>
            <div className="btn-content">
              <h3>My Crafts</h3>
              <p>Manage your existing creations</p>
            </div>
          </button>

          {/* Find Partner Button */}
          <button 
            className="action-btn tertiary-btn"
            onClick={() => onNavigate('collaboration')}
            aria-label="Find a partner - Connect with fellow artisans"
          >
            <div className="btn-icon" aria-hidden="true">
              <div className="handshake-icon">🤝</div>
            </div>
            <div className="btn-content">
              <h3>Find a Partner</h3>
              <p>Connect with fellow artisans</p>
            </div>
          </button>

          {/* My Showcase Button */}
          <button 
            className="action-btn showcase-btn"
            onClick={() => onNavigate('showcase')}
            aria-label="My showcase - View your public portfolio page"
          >
            <div className="btn-icon" aria-hidden="true">
              <div className="showcase-icon">🌟</div>
            </div>
            <div className="btn-content">
              <h3>My Showcase</h3>
              <p>View your public portfolio page</p>

            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

// Add New Craft Flow Component
const AddNewCraftFlow = ({ onNavigate, userName = "Priya" }) => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [uploadedPhoto, setUploadedPhoto] = React.useState(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [voiceText, setVoiceText] = React.useState('')
  const [generatedContent, setGeneratedContent] = React.useState('')

  // Handle photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload process
      setTimeout(() => {
        setUploadedPhoto(URL.createObjectURL(file))
        setIsUploading(false)
        setTimeout(() => setCurrentStep(2), 1000)
      }, 2000)
    }
  }

  // Handle voice recording
  const toggleVoiceRecording = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setVoiceText("This beautiful pottery piece was handcrafted using traditional techniques passed down through generations. Made from locally sourced clay and fired in a traditional kiln, it represents the rich heritage of Indian craftsmanship.")
        setIsListening(false)
        setTimeout(() => setCurrentStep(3), 1000)
      }, 3000)
    }
  }

  // Generate AI content
  React.useEffect(() => {
    if (currentStep === 3 && !generatedContent) {
      setTimeout(() => {
        setGeneratedContent("🏺 Handcrafted Traditional Pottery\n\nThis exquisite pottery piece showcases the timeless artistry of traditional Indian craftsmanship. Each curve and detail tells a story of heritage, skill, and passion passed down through generations.\n\n✨ Crafted from locally sourced clay\n🔥 Fired using traditional kiln methods\n🎨 Features authentic regional designs\n💫 Perfect for home decor or gifting\n\nExperience the beauty of authentic handmade pottery that brings warmth and character to any space.")
      }, 1500)
    }
  }, [currentStep])

  // Copy to clipboard
  const copyToClipboard = (platform) => {
    const platformContent = {
      'etsy': `${generatedContent}\n\n#HandmadePottery #TraditionalCrafts #IndianArt #Etsy`,
      'social': `${generatedContent}\n\n#Handmade #TraditionalCrafts #IndianArtisan #SupportLocal`,
      'website': `${generatedContent}\n\nAuthentic handcrafted items available for purchase.`,
      'general': generatedContent
    }
    navigator.clipboard.writeText(platformContent[platform] || generatedContent)
    alert(`Content copied for ${platform === 'general' ? 'general use' : platform}!`)
  }

  // Play generated content
  const playContent = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(generatedContent)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    } else {
      alert('Text-to-speech not supported in this browser')
    }
  }

  return (
    <div className="craft-flow-container">
      {/* Navigation Header */}
      <header className="dashboard-header" role="banner">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => onNavigate('dashboard')}
            aria-label="Go back to dashboard"
          >
            ← Back
          </button>
          <div className="logo" aria-label="Kalaikatha - Traditional Crafts Platform">🏺 Kalaikatha</div>
        </div>
        <div className="header-right">
          <button 
            className="notification-icon" 
            aria-label="View notifications"
            title="Notifications"
          >
            🔔
          </button>
          <div className="user-profile" role="button" tabIndex="0" aria-label={`User profile: ${userName}`}>
            <div className="avatar" aria-hidden="true">👤</div>
            <span className="user-name">{userName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="craft-flow-main" role="main">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-indicator">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>①</div>
            <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>②</div>
            <div className={`progress-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>③</div>
          </div>
        </div>

        {/* Step Content */}
        <div className="step-content">
          {/* Step 1: Photo Upload */}
          {currentStep === 1 && (
            <div className="step-screen photo-upload-screen">
              <h1 className="step-headline">
                Step 1: Show us your craft. You can take a photo or upload one.
              </h1>
              
              <div className="upload-section">
                {!isUploading && !uploadedPhoto && (
                  <label className="upload-button" htmlFor="photo-input">
                    <div className="upload-icon">📷</div>
                    <span>Upload Photo</span>
                    <input 
                      type="file" 
                      id="photo-input"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}

                {isUploading && (
                  <div className="upload-progress">
                    <div className="spinner"></div>
                    <p>Enhancing your photo now...</p>
                  </div>
                )}

                {uploadedPhoto && !isUploading && (
                  <div className="upload-success">
                    <img src={uploadedPhoto} alt="Uploaded craft" className="uploaded-image" />
                    <p>✨ Photo enhanced! Moving to next step...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Voice Input */}
          {currentStep === 2 && (
            <div className="step-screen voice-input-screen">
              <h1 className="step-headline">
                Step 2: Tell us its story. What is it made of? What inspired you?
              </h1>
              
              <div className="voice-section">
                <button 
                  className={`microphone-button ${isListening ? 'listening' : ''}`}
                  onClick={toggleVoiceRecording}
                  aria-label={isListening ? 'Stop recording' : 'Start recording'}
                >
                  <div className="microphone-icon">🎤</div>
                  {isListening && <div className="sound-wave"></div>}
                </button>
                
                {isListening && (
                  <p className="listening-text">Listening...</p>
                )}
                
                {voiceText && !isListening && (
                  <div className="voice-success">
                    <p>✨ Story captured! Processing your craft...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Content Generation */}
          {currentStep === 3 && (
            <div className="step-screen content-generation-screen">
              <h1 className="celebratory-headline">
                Your assistant has drafted everything! You can listen or copy.
              </h1>
              
              <div className="content-section">
                {generatedContent ? (
                  <>
                    <div className="ai-content-display">
                      <div className="content-text">{generatedContent}</div>
                    </div>
                    
                    <div className="action-controls">
                      {/* Large Prominent Play Button */}
                      <button 
                        className="play-button-primary"
                        onClick={playContent}
                        aria-label="Play generated content aloud"
                      >
                        <span className="speaker-icon">🔊</span>
                        <span className="button-text">Play</span>
                      </button>
                      
                      {/* Copy Button Group */}
                      <div className="copy-button-group">
                        <h3 className="copy-section-title">Copy for Platform:</h3>
                        <div className="copy-buttons-container">
                          <button 
                            className="copy-platform-button"
                            onClick={() => copyToClipboard('etsy')}
                            aria-label="Copy content optimized for Etsy marketplace"
                          >
                            <span className="copy-icon">📋</span>
                            <span className="platform-text">Copy for Etsy</span>
                          </button>
                          <button 
                            className="copy-platform-button"
                            onClick={() => copyToClipboard('social')}
                            aria-label="Copy content optimized for social media"
                          >
                            <span className="copy-icon">📋</span>
                            <span className="platform-text">Copy for Social Media</span>
                          </button>
                          <button 
                            className="copy-platform-button"
                            onClick={() => copyToClipboard('website')}
                            aria-label="Copy content optimized for website"
                          >
                            <span className="copy-icon">📋</span>
                            <span className="platform-text">Copy for Website</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="completion-section">
                      <button 
                        className="return-dashboard-button"
                        onClick={() => onNavigate('dashboard')}
                        aria-label="Complete flow and return to dashboard"
                      >
                        ✨ Done! Return to Dashboard
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="generating-content">
                    <div className="spinner"></div>
                    <p>Creating your craft description...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Artisan Showcase Component
const ArtisanShowcase = ({ onNavigate }) => {
  return (
    <div className="artisan-showcase-container">
      {/* Navigation Bar */}
      <nav className="showcase-nav">
        <div className="nav-content">
          <div className="logo">
            🏺 Kalaikatha
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate('home')} className="nav-link">Home</button>
            <button onClick={() => onNavigate('dashboard')} className="nav-link">Dashboard</button>
            <button className="nav-link">Contact</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="showcase-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="showcase-headline">Meet the Hands That Create</h1>
            
            {/* Artisan Photo */}
            <div className="artisan-photo-container">
              <div className="artisan-photo">
                👩‍🎨
              </div>
            </div>

            {/* About the Artisan */}
            <div className="artisan-story">
              <h2 className="story-title">Priya Sharma - Master Potter</h2>
              <div className="story-content">
                <p>
                  In the heart of Rajasthan, where the desert winds carry stories of ancient traditions, 
                  Priya Sharma continues a legacy that spans five generations. Her hands, shaped by clay 
                  and time, transform humble earth into vessels that hold not just water, but the essence 
                  of her ancestors' wisdom.
                </p>
                <p>
                  Growing up in her grandmother's workshop, Priya learned that pottery is more than craft—it's 
                  a conversation between earth and soul. Each piece she creates tells a story, from the 
                  traditional blue pottery techniques passed down through generations to contemporary forms 
                  that speak to modern hearts while honoring ancient roots.
                </p>
                <p>
                  Her work celebrates the imperfect beauty of handmade art, where each vessel carries the 
                  unique fingerprint of its creator. Through every pot, bowl, and vase, Priya bridges the 
                  gap between tradition and innovation, creating functional art that brings warmth and 
                  authenticity to everyday life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Gallery Section */}
        <section className="product-gallery">
          <h2 className="gallery-title">Crafted with Love</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="product-image">🏺</div>
              <h3>Traditional Water Vessels</h3>
            </div>
            <div className="gallery-item">
              <div className="product-image">🫖</div>
              <h3>Handcrafted Tea Sets</h3>
            </div>
            <div className="gallery-item">
              <div className="product-image">🏛️</div>
              <h3>Decorative Planters</h3>
            </div>
            <div className="gallery-item">
              <div className="product-image">🍲</div>
              <h3>Serving Bowls</h3>
            </div>
            <div className="gallery-item">
              <div className="product-image">🕯️</div>
              <h3>Ceramic Candle Holders</h3>
            </div>
            <div className="gallery-item">
              <div className="product-image">🏺</div>
              <h3>Blue Pottery Collection</h3>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <button className="explore-collection-btn">
            Explore My Collection
          </button>
          
          {/* Social Media Icons */}
          <div className="social-media">
            <h3>Follow My Journey</h3>
            <div className="social-icons">
              <button className="social-icon instagram">📷</button>
              <button className="social-icon facebook">👥</button>
              <button className="social-icon twitter">🐦</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Collaboration Flow Component
const CollaborationFlow = ({ onNavigate, userName = "Priya" }) => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [selectedStyle, setSelectedStyle] = React.useState(null)
  const [matchedPartner, setMatchedPartner] = React.useState(null)

  // Mock data for matched partners based on style choice
  const partnerData = {
    traditional: {
      name: "Meera Sharma",
      craft: "Traditional Pottery",
      style: "Traditional Indian patterns",
      description: "Meera creates beautiful pottery using techniques passed down through five generations. She specializes in terracotta work with intricate hand-painted designs inspired by Rajasthani folk art.",
      avatar: "👩‍🎨",
      location: "Jaipur, Rajasthan"
    },
    contemporary: {
      name: "Arjun Patel", 
      craft: "Contemporary Weaving",
      style: "Modern geometric designs",
      description: "Arjun combines traditional weaving techniques with contemporary patterns, creating stunning textiles that bridge old and new. His work has been featured in design galleries across India.",
      avatar: "👨‍🎨",
      location: "Ahmedabad, Gujarat"
    }
  }

  // Handle style selection
  const handleStyleSelection = (style) => {
    setSelectedStyle(style)
    setMatchedPartner(partnerData[style])
    setTimeout(() => setCurrentStep(3), 800)
  }

  // Start the quiz
  const startQuiz = () => {
    setCurrentStep(2)
  }

  // Connect with partner
  const connectWithPartner = () => {
    alert(`Connecting you with ${matchedPartner.name}! A collaboration request has been sent.`)
    onNavigate('dashboard')
  }

  return (
    <div className="collaboration-flow-container">
      {/* Navigation Header */}
      <header className="dashboard-header" role="banner">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => onNavigate('dashboard')}
            aria-label="Go back to dashboard"
          >
            ← Back
          </button>
          <div className="logo" aria-label="Kalaikatha - Traditional Crafts Platform">🏺 Kalaikatha</div>
        </div>
        <div className="header-right">
          <button 
            className="notification-icon" 
            aria-label="View notifications"
            title="Notifications"
          >
            🔔
          </button>
          <div className="user-profile" role="button" tabIndex="0" aria-label={`User profile: ${userName}`}>
            <div className="avatar" aria-hidden="true">👤</div>
            <span className="user-name">{userName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="collaboration-main" role="main">
        {/* Screen 1: Intro */}
        {currentStep === 1 && (
          <div className="collab-screen intro-screen">
            <div className="intro-content">
              <h1 className="intro-headline">
                Find a creative partner! We'll help you find someone whose art is a perfect match for yours.
              </h1>
              
              <button 
                className="start-quiz-button"
                onClick={startQuiz}
                aria-label="Start the collaboration quiz to find your creative partner"
              >
                Start the Quiz
              </button>
            </div>
          </div>
        )}

        {/* Screen 2: Visual Quiz */}
        {currentStep === 2 && (
          <div className="collab-screen quiz-screen">
            <h1 className="quiz-headline">
              Which style speaks to you more?
            </h1>
            
            <div className="style-options">
              <button 
                className="style-option traditional-style"
                onClick={() => handleStyleSelection('traditional')}
                aria-label="Select traditional Indian craft style"
              >
                <div className="style-image traditional-image">
                  <div className="image-placeholder">
                    <span className="craft-icon">🏺</span>
                    <span className="pattern-overlay">🎨</span>
                  </div>
                </div>
                <div className="style-label">
                  <h3>Traditional</h3>
                  <p>Classic Indian patterns & techniques</p>
                </div>
              </button>

              <button 
                className="style-option contemporary-style"
                onClick={() => handleStyleSelection('contemporary')}
                aria-label="Select contemporary modern craft style"
              >
                <div className="style-image contemporary-image">
                  <div className="image-placeholder">
                    <span className="craft-icon">🧶</span>
                    <span className="pattern-overlay">📐</span>
                  </div>
                </div>
                <div className="style-label">
                  <h3>Contemporary</h3>
                  <p>Modern designs with traditional roots</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Screen 3: Match Results */}
        {currentStep === 3 && matchedPartner && (
          <div className="collab-screen results-screen">
            <h1 className="results-headline">
              We found a great match for you! <span className="partner-name">{matchedPartner.name}</span> is an artist in <span className="partner-craft">{matchedPartner.craft}</span> and shares your love for <span className="partner-style">{matchedPartner.style}</span>.
            </h1>
            
            <div className="partner-profile-card">
              <div className="profile-header">
                <div className="profile-avatar">{matchedPartner.avatar}</div>
                <div className="profile-info">
                  <h2 className="partner-name-large">{matchedPartner.name}</h2>
                  <p className="partner-location">📍 {matchedPartner.location}</p>
                  <p className="partner-specialty">{matchedPartner.craft}</p>
                </div>
              </div>
              
              <div className="profile-description">
                <p>{matchedPartner.description}</p>
              </div>
              
              <button 
                className="connect-button"
                onClick={connectWithPartner}
                aria-label={`Connect with ${matchedPartner.name} for collaboration`}
              >
                Connect Now
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// AI Tools Page Component
const AIToolsPage = ({ onNavigate }) => {
  return (
    <div style={{
      backgroundColor: '#3c4859',
      minHeight: '100vh',
      color: 'white'
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: '#E57373',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>
      
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>AI Tools</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { icon: '📝', title: 'Content Generator', desc: 'AI-powered product descriptions' },
            { icon: '🎤', title: 'Voice Assistant', desc: 'Voice commands and narration' },
            { icon: '🖼️', title: 'Image Enhancer', desc: 'Professional product photos' },
            { icon: '💰', title: 'Pricing Assistant', desc: 'Smart pricing suggestions' },
            { icon: '📖', title: 'Story Generator', desc: 'Craft compelling narratives' },
            { icon: '🤝', title: 'Fusion Matchmaker', desc: 'Find collaboration partners' }
          ].map((tool, index) => (
            <div key={index} style={{
              background: '#4a5568',
              padding: '2rem',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{tool.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{tool.title}</h3>
              <p style={{ color: '#a0aec0' }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// User Flow Page Component  
const UserFlowPage = ({ onNavigate }) => {
  return (
    <div style={{
      backgroundColor: '#2d3748',
      minHeight: '100vh',
      color: 'white',
      padding: '40px'
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          background: '#E57373',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        ← Back to Home
      </button>
      
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
        Artisan Journey
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {[
          { step: 1, title: 'Sign Up', desc: 'Create your artisan profile' },
          { step: 2, title: 'Add Products', desc: 'Upload your creations with AI assistance' },
          { step: 3, title: 'Dashboard', desc: 'Manage orders and inventory' },
          { step: 4, title: 'AI Enhancement', desc: 'Optimize listings with AI tools' },
          { step: 5, title: 'Collaborate', desc: 'Find fusion partners and grow' }
        ].map((item, index) => (
          <div key={index} style={{
            background: '#4a5568',
            padding: '2rem',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#E57373',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {item.step}
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: '#a0aec0' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Sign Up Page Component
const SignUpPage = ({ onNavigate }) => {
  const [formData, setFormData] = React.useState({
    phoneNumber: '',
    countryCode: '+91',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');
  const [passwordStrength, setPasswordStrength] = React.useState('');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation would go here
    console.log('Sign up with:', formData);
    // For now, navigate to dashboard after successful signup
    onNavigate('dashboard');
  };

  return (
    <div className="signup-page-container">
      {/* Navigation Bar */}
      <nav className="signup-nav">
        <div className="nav-content">
          <div className="logo" onClick={() => onNavigate('home')}>
            🏺 Kalaikatha
          </div>
          <div className="nav-right">
            <div className="language-selector">
              <button 
                className="language-btn"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                aria-label="Select language"
                aria-expanded={showLanguageDropdown}
              >
                <span className="flag">{currentLanguage.flag}</span>
                <span className="language-name">{currentLanguage.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {showLanguageDropdown && (
                <div className="language-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${selectedLanguage === lang.code ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span className="flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              className="home-btn"
              onClick={() => onNavigate('home')}
              aria-label="Go to home page"
            >
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="signup-main">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Join Kalaikatha</h1>
            <p>Create your account to start showcasing your craftsmanship</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <div className="phone-input-group">
                <select
                  className="country-code-select"
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange('countryCode', e.target.value)}
                  aria-label="Country code"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="form-input phone-input"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  aria-describedby="phone-help"
                />
              </div>
              <div id="phone-help" className="form-help">
                We'll use this to verify your account and send important updates
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email ID <span className="optional">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                aria-describedby="email-help"
              />
              <div id="email-help" className="form-help">
                Optional - for updates and easier account recovery
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="required">*</span>
              </label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input password-input"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a secure password"
                  required
                  aria-describedby="password-help"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password && (
                <div className={`password-strength ${passwordStrength}`}>
                  Password strength: <span className="strength-text">{passwordStrength}</span>
                </div>
              )}
              <div id="password-help" className="form-help">
                Use at least 6 characters with a mix of letters and numbers
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="login-link-container">
            <p>Already have an account?</p>
            <button
              type="button"
              className="login-link"
              onClick={() => onNavigate('signin')}
            >
              I've Been Here Before
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// SignIn Page Component
const SignInPage = ({ onNavigate }) => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ka', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Simulate a login error
      if (formData.username === 'error@example.com' || formData.password === 'error') {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      } else {
        // Simulate successful login
        setIsLoading(false);
        // Navigate to dashboard or home after successful sign in
        onNavigate('dashboard');
      }
    }, 1500);
  };

  const isFormValid = formData.username.trim() && formData.password.trim();

  return (
    <div className="signin-page-container">
      {/* Navigation Bar */}
      <nav className="signin-nav">
        <div className="nav-content">
          <div className="logo" onClick={() => onNavigate('home')}>
            🏺 Kalaikatha
          </div>
          <div className="nav-right">
            <div className="language-selector">
              <button 
                className="language-button"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                aria-label="Select language"
                aria-expanded={showLanguageDropdown}
              >
                <span className="language-name">{currentLanguage.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showLanguageDropdown && (
                <div className="language-dropdown">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`language-option ${lang.code === selectedLanguage ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <span className="language-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              className="home-btn"
              onClick={() => onNavigate('home')}
              aria-label="Go to home page"
            >
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="signin-main">
        <div className="signin-container">
          {/* Header */}
          <div className="signin-header">
            <h1 className="signin-title">Welcome Back</h1>
            <p className="signin-subtitle">Sign in to your account to continue your craft journey</p>
          </div>

          {/* Sign In Form */}
          <form className="signin-form" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Mobile Number or Email"
                  className="form-input"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="form-group" style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                {error}
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="forgot-password-wrapper">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => {
                  // Handle forgot password functionality
                  alert('Forgot password functionality coming soon!');
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className={`signin-button ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Sign Up Link */}
            <div className="signup-link-wrapper">
              <p className="signup-text">
                New to KalaiKatha?{' '}
                <button
                  type="button"
                  className="signup-link"
                  onClick={() => onNavigate('signup')}
                >
                  Create an Account
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

// Main App Component
const KalaikathaApp = () => {
  const [currentPage, setCurrentPage] = React.useState('home')
  const { isListening, startListening, stopListening } = useVoiceRecognition()

  const navigate = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />
      case 'signup':
        return <SignUpPage onNavigate={navigate} />
      case 'signin':
        return <SignInPage onNavigate={navigate} />
      case 'dashboard':
        return <ArtisanDashboard onNavigate={navigate} />
      case 'add-craft':
        return <AddNewCraftFlow onNavigate={navigate} />
      case 'collaboration':
        return <CollaborationFlow onNavigate={navigate} />
      case 'showcase':
        return <ArtisanShowcase onNavigate={navigate} />
      case 'login':
        return <HomePage onNavigate={navigate} />
      case 'ai-tools':
        return <AIToolsPage onNavigate={navigate} />
      case 'user-flow':
        return <UserFlowPage onNavigate={navigate} />
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <div>
      {renderPage()}
      
      {/* Voice Control Indicator */}
      {isListening && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#E57373',
          color: 'white',
          padding: '15px',
          borderRadius: '50px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          🎤 Listening...
        </div>
      )}
    </div>
  )
}

// Render the app

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <KalaikathaApp />
  </React.StrictMode>
)

console.log('🎨 Kalaikatha app rendered successfully!')