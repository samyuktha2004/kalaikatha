import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

const MyCraftsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user's crafts
    setTimeout(() => {
      setCrafts([
        {
          id: 1,
          name: "Ceramic Vase",
          description: "Handcrafted ceramic vase with traditional patterns",
          image: "🏺",
          price: "$45",
          status: "published",
          views: 156,
          likes: 23
        },
        {
          id: 2,
          name: "Woven Basket",
          description: "Traditional basket woven with natural fibers",
          image: "🧺",
          price: "$32",
          status: "draft",
          views: 0,
          likes: 0
        },
        {
          id: 3,
          name: "Clay Sculpture",
          description: "Abstract clay sculpture inspired by nature",
          image: "🎨",
          price: "$78",
          status: "published",
          views: 89,
          likes: 12
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditCraft = (craftId) => {
    navigate(`/edit-craft/${craftId}`);
  };

  const handleDeleteCraft = (craftId) => {
    if (window.confirm('Are you sure you want to delete this craft?')) {
      setCrafts(crafts.filter(craft => craft.id !== craftId));
    }
  };

  const handlePublishToggle = (craftId) => {
    setCrafts(crafts.map(craft => 
      craft.id === craftId 
        ? { ...craft, status: craft.status === 'published' ? 'draft' : 'published' }
        : craft
    ));
  };

  if (loading) {
    return (
      <div className="my-crafts-loading">
        <div className="loading-spinner">🎨 Loading your crafts...</div>
      </div>
    );
  }

  return (
    <div className="my-crafts-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Crafts</h1>
          <p>Manage your craft listings and track performance</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="add-craft-btn"
            onClick={() => navigate('/add-craft')}
          >
            ➕ Add New Craft
          </button>
          
          <button 
            className="back-btn"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="crafts-stats">
        <div className="stat-card">
          <div className="stat-number">{crafts.length}</div>
          <div className="stat-label">Total Crafts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{crafts.filter(c => c.status === 'published').length}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{crafts.reduce((sum, c) => sum + c.views, 0)}</div>
          <div className="stat-label">Total Views</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{crafts.reduce((sum, c) => sum + c.likes, 0)}</div>
          <div className="stat-label">Total Likes</div>
        </div>
      </div>

      {crafts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎨</div>
          <h3>No crafts yet</h3>
          <p>Start by creating your first craft listing!</p>
          <button 
            className="create-first-btn"
            onClick={() => navigate('/add-craft')}
          >
            Create Your First Craft
          </button>
        </div>
      ) : (
        <div className="crafts-grid">
          {crafts.map(craft => (
            <div key={craft.id} className="craft-card">
              <div className="craft-image">
                <div className="image-placeholder">{craft.image}</div>
                <div className={`status-badge ${craft.status}`}>
                  {craft.status === 'published' ? '🌟 Published' : '📝 Draft'}
                </div>
              </div>
              
              <div className="craft-info">
                <h3 className="craft-name">{craft.name}</h3>
                <p className="craft-description">{craft.description}</p>
                <div className="craft-price">{craft.price}</div>
                
                <div className="craft-stats">
                  <span className="stat-item">👀 {craft.views}</span>
                  <span className="stat-item">❤️ {craft.likes}</span>
                </div>
              </div>
              
              <div className="craft-actions">
                <button 
                  className="action-btn edit"
                  onClick={() => handleEditCraft(craft.id)}
                  title="Edit craft"
                >
                  ✏️
                </button>
                
                <button 
                  className="action-btn publish"
                  onClick={() => handlePublishToggle(craft.id)}
                  title={craft.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  {craft.status === 'published' ? '📤' : '📥'}
                </button>
                
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteCraft(craft.id)}
                  title="Delete craft"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCraftsPage;