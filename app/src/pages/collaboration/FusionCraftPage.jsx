/**
 * FusionCraftPage - Simplified Collaboration Feature
 * Combines: Collaboration + Moodboard Quiz + AI Matchmaking
 * MVP Focus: Quick style matching to find fusion craft partners
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserFlow } from '../../contexts/UserFlowContext';
import { api } from '../../services/api';
import './FusionCraftPage.css';

const FusionCraftPage = () => {
  const navigate = useNavigate();
  const { flowState, setFlowState } = useUserFlow();
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState({});
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simplified moodboard questions for MVP
  const fusionQuestions = [
    {
      id: 'style',
      question: '🎨 What fusion style interests you?',
      options: [
        { id: 'traditional-modern', label: 'Traditional + Modern', emoji: '🏛️➕🏢', description: 'Blend heritage with contemporary' },
        { id: 'natural-tech', label: 'Natural + Tech', emoji: '🌿➕💻', description: 'Combine organic materials with technology' },
        { id: 'cultural-global', label: 'Cultural + Global', emoji: '🌍➕🎭', description: 'Mix local traditions with global trends' }
      ]
    },
    {
      id: 'materials',
      question: '🔨 What materials would you like to experiment with?',
      options: [
        { id: 'clay-metal', label: 'Clay + Metal', emoji: '🏺➕⚙️', description: 'Ceramic and metalwork fusion' },
        { id: 'textile-wood', label: 'Textile + Wood', emoji: '🧵➕🌳', description: 'Fabric and woodcraft combination' },
        { id: 'stone-glass', label: 'Stone + Glass', emoji: '🪨➕🔮', description: 'Traditional stone with glass elements' }
      ]
    },
    {
      id: 'goal',
      question: '🎯 What\'s your collaboration goal?',
      options: [
        { id: 'learn', label: 'Learn New Techniques', emoji: '📚', description: 'Expand your skillset' },
        { id: 'teach', label: 'Share My Expertise', emoji: '🎓', description: 'Guide other artisans' },
        { id: 'create', label: 'Create Together', emoji: '🤝', description: 'Joint product development' }
      ]
    }
  ];

  const handleOptionSelect = (questionId, optionId) => {
    const newPreferences = { ...preferences, [questionId]: optionId };
    setPreferences(newPreferences);

    // Move to next question or finish
    if (currentStep < fusionQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      findMatches(newPreferences);
    }
  };

  const findMatches = async (userPreferences) => {
    setLoading(true);
    setCurrentStep(4); // Results step

    try {
      // In real app, call AI matchmaking API
      // For MVP, use mock data with simple logic
      const mockMatches = generateMockMatches(userPreferences);
      
      setTimeout(() => {
        setMatches(mockMatches);
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Matchmaking failed:', error);
      setLoading(false);
    }
  };

  // Generate mock matches based on preferences (MVP version)
  const generateMockMatches = (prefs) => {
    const mockArtisans = [
      {
        id: 1,
        name: 'Priya Sharma',
        specialization: 'Traditional Pottery',
        location: 'Rajasthan',
        avatar: '👩‍🎨',
        compatibilityScore: 92,
        matchReason: 'Perfect style and material compatibility',
        portfolio: ['🏺', '🪔', '🎨'],
        collaboration: 'Open to teaching ceramic techniques'
      },
      {
        id: 2,
        name: 'Arjun Reddy',
        specialization: 'Metal Sculpture',
        location: 'Karnataka',
        avatar: '👨‍🎨',
        compatibilityScore: 87,
        matchReason: 'Complementary skills for fusion projects',
        portfolio: ['⚙️', '🔧', '🗿'],
        collaboration: 'Looking for creative partnerships'
      },
      {
        id: 3,
        name: 'Maya Patel',
        specialization: 'Textile Arts',
        location: 'Gujarat',
        avatar: '👩‍🎨',
        compatibilityScore: 81,
        matchReason: 'Shared interest in traditional-modern fusion',
        portfolio: ['🧵', '🪡', '👘'],
        collaboration: 'Experienced in collaborative projects'
      }
    ];

    // Simple matching logic for MVP
    return mockArtisans.map(artisan => ({
      ...artisan,
      compatibilityScore: Math.floor(Math.random() * 20) + 75 // 75-95%
    })).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  };

  const handleConnect = (artisan) => {
    alert(`Connection request sent to ${artisan.name}! 🤝`);
    // In real app, send connection request via API
  };

  const renderCurrentStep = () => {
    if (currentStep <= fusionQuestions.length) {
      const question = fusionQuestions[currentStep - 1];
      
      return (
        <div className="quiz-step">
          <div className="step-header">
            <h2>{question.question}</h2>
            <div className="progress-indicator">
              Step {currentStep} of {fusionQuestions.length}
            </div>
          </div>

          <div className="fusion-options">
            {question.options.map(option => (
              <div 
                key={option.id}
                className="fusion-option"
                onClick={() => handleOptionSelect(question.id, option.id)}
              >
                <div className="option-emoji">{option.emoji}</div>
                <h3>{option.label}</h3>
                <p>{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="results-step">
          {loading ? (
            <div className="matching-animation">
              <div className="ai-matching">🤖</div>
              <h2>AI is finding your perfect fusion partners...</h2>
              <div className="matching-steps">
                <div className="step completed">✓ Analyzing your preferences</div>
                <div className="step completed">✓ Scanning artisan profiles</div>
                <div className="step active">🔄 Calculating compatibility</div>
                <div className="step">⏳ Ranking matches</div>
              </div>
            </div>
          ) : (
            <div className="matches-results">
              <h2>🎉 Your Fusion Partners Await!</h2>
              <p>Based on your preferences, here are the top artisans for collaboration:</p>
              
              <div className="matches-grid">
                {matches.map(match => (
                  <div key={match.id} className="match-card">
                    <div className="match-header">
                      <div className="match-avatar">{match.avatar}</div>
                      <div className="match-info">
                        <h3>{match.name}</h3>
                        <p className="specialization">{match.specialization}</p>
                        <p className="location">📍 {match.location}</p>
                      </div>
                      <div className="compatibility-score">
                        <div className="score-circle">{match.compatibilityScore}%</div>
                        <span>Match</span>
                      </div>
                    </div>

                    <div className="match-reason">
                      <strong>Why this match:</strong> {match.matchReason}
                    </div>

                    <div className="portfolio">
                      <strong>Portfolio:</strong>
                      <div className="portfolio-icons">
                        {match.portfolio.map((icon, index) => (
                          <span key={index} className="portfolio-icon">{icon}</span>
                        ))}
                      </div>
                    </div>

                    <div className="collaboration-note">
                      💡 {match.collaboration}
                    </div>

                    <button 
                      className="connect-btn"
                      onClick={() => handleConnect(match)}
                    >
                      🤝 Connect for Fusion
                    </button>
                  </div>
                ))}
              </div>

              <div className="results-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setCurrentStep(1);
                    setPreferences({});
                    setMatches([]);
                  }}
                >
                  🔄 Start Over
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  📋 Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="fusion-craft-page">
      <div className="page-header">
        <h1>🤝 Find Your Fusion Craft Partner</h1>
        <p>Connect with artisans for creative collaborations and skill exchange</p>
      </div>

      <div className="fusion-content">
        {renderCurrentStep()}
      </div>

      <div className="info-banner">
        <h3>🌟 Why Fusion Crafts?</h3>
        <div className="benefits">
          <div className="benefit">
            <span className="benefit-icon">💡</span>
            <span>Learn new techniques</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🎨</span>
            <span>Create unique products</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🌍</span>
            <span>Expand your market reach</span>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🤝</span>
            <span>Build lasting partnerships</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionCraftPage;