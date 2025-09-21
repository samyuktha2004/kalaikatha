import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollaborationFlow = ({ userName = "Priya" }) => {
  const navigate = useNavigate();
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
    navigate('/dashboard')
  }

  return (
    <div className="collaboration-flow-container">
      {/* Navigation Header */}
      <header className="dashboard-header" role="banner">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
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

export default CollaborationFlow;