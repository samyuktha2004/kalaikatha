/**
 * ArtisanDashboard - Main dashboard for artisan marketplace assistant
 * MVP Actions: Add New Craft, View My Crafts, Find Fusion Partners
 * Focus: AI-powered tools to help artisans manage and market their crafts
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { useUserFlow } from '../../contexts/UserFlowContext';
import './ArtisanDashboard.css';

const ArtisanDashboard = ({ onShowDecision }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startNewProductFlow, startFusionFlow } = useUserFlow();
  const [stats, setStats] = useState({
    totalCrafts: 0,
    views: 0,
    collaborations: 0
  });

  useEffect(() => {
    // In real app, fetch user stats from Firestore
    setStats({
      totalCrafts: 5,
      views: 234,
      collaborations: 2
    });
  }, []);

  const handleAddNewCraft = () => {
    startNewProductFlow();
    if (onShowDecision) {
      onShowDecision();
    } else {
      navigate('/add-craft');
    }
  };

  const handleViewMyCrafts = () => {
    navigate('/my-crafts');
  };

  const handleMyShowcase = () => {
    navigate('/showcase');
  };

  const handleFindFusionPartners = () => {
    startFusionFlow();
    navigate('/collaboration');
  };

  const dashboardActions = [
    {
      id: 'add-craft',
      title: 'Add New Craft',
      description: 'Use AI to create compelling product descriptions from your images and voice',
      icon: '🎨',
      color: 'primary',
      action: handleAddNewCraft,
      features: ['📸 Smart image analysis', '🎤 Voice-to-text conversion', '🤖 AI content generation', '📝 SEO optimization']
    },
    {
      id: 'my-crafts',
      title: 'My Crafts',
      description: 'Manage existing products, update content, and track performance',
      icon: '📋',
      color: 'secondary',
      action: handleViewMyCrafts,
      features: ['📊 Performance analytics', '✏️ Edit descriptions', '🔄 Update images', '💰 Price optimization']
    },
    {
      id: 'my-showcase',
      title: 'My Showcase',
      description: 'View and customize your public artisan profile and portfolio',
      icon: '🖼️',
      color: 'tertiary',
      action: handleMyShowcase,
      features: ['🎨 Portfolio display', '📱 Mobile-friendly', '🔗 Share profile', '⭐ Customer reviews']
    },
    {
      id: 'fusion-partners',
      title: 'Find Fusion Partners',
      description: 'Connect with other artisans for collaborative fusion crafts',
      icon: '🤝',
      color: 'accent',
      action: handleFindFusionPartners,
      features: ['🎭 Style matching', '🔍 Skill-based pairing', '💡 Project suggestions', '📱 Direct messaging']
    }
  ];

  const aiTools = [
    {
      name: 'Content Generator',
      description: 'Create product descriptions',
      link: '/ai-tools/content-generator',
      icon: '✍️'
    },
    {
      name: 'Image Enhancer',
      description: 'Improve product photos',
      link: '/ai-tools/image-enhancer',
      icon: '🖼️'
    },
    {
      name: 'Pricing Assistant',
      description: 'Get AI price suggestions',
      link: '/ai-tools/pricing-assistant',
      icon: '💰'
    },
    {
      name: 'Voice Assistant',
      description: 'Voice-powered interactions',
      link: '/ai-tools/voice-assistant',
      icon: '🎤'
    }
  ];

  return (
    <div className="artisan-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.displayName || 'Artisan'}! 🎨</h1>
          <p className="subtitle">Your AI-powered marketplace assistant is ready to help</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎨</div>
            <div className="stat-info">
              <div className="stat-number">{stats.totalCrafts}</div>
              <div className="stat-label">Total Crafts</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👀</div>
            <div className="stat-info">
              <div className="stat-number">{stats.views}</div>
              <div className="stat-label">Total Views</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🤝</div>
            <div className="stat-info">
              <div className="stat-number">{stats.collaborations}</div>
              <div className="stat-label">Collaborations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="main-actions">
        <h2>What would you like to do today?</h2>
        
        {/* Quick Decision Button */}
        <div className="quick-decision">
          <button 
            className="decision-trigger-btn"
            onClick={() => onShowDecision && onShowDecision()}
          >
            🎯 Quick Start: New Product or View Existing?
          </button>
        </div>
        
        <div className="actions-grid">
          {dashboardActions.map((action) => (
            <div 
              key={action.id}
              className={`action-card ${action.color}`}
              onClick={action.action}
            >
              <div className="action-header">
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
              </div>
              
              <p className="action-description">{action.description}</p>
              
              <div className="action-features">
                {action.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    {feature}
                  </div>
                ))}
              </div>
              
              <button className="action-button">
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tools Quick Access */}
      <div className="ai-tools-section">
        <h2>🤖 AI Tools Quick Access</h2>
        <div className="tools-grid">
          {aiTools.map((tool, index) => (
            <div 
              key={index}
              className="tool-card"
              onClick={() => navigate(tool.link)}
            >
              <div className="tool-icon">{tool.icon}</div>
              <h4>{tool.name}</h4>
              <p>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>📈 Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🎨</div>
            <div className="activity-content">
              <div className="activity-title">Ceramic Vase content generated</div>
              <div className="activity-time">2 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🤝</div>
            <div className="activity-content">
              <div className="activity-title">New collaboration request from Maya</div>
              <div className="activity-time">1 day ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💰</div>
            <div className="activity-content">
              <div className="activity-title">Price suggestion for Wooden Sculpture</div>
              <div className="activity-time">3 days ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="tips-section">
        <h2>💡 AI Assistant Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">📸</div>
            <h4>Better Photos = Better AI</h4>
            <p>Take clear, well-lit photos from multiple angles for best AI content generation</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🎤</div>
            <h4>Detailed Voice Descriptions</h4>
            <p>Mention materials, techniques, and inspiration when recording for richer content</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🤖</div>
            <h4>Review AI Suggestions</h4>
            <p>Always review and personalize AI-generated content before publishing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;