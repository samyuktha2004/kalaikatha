import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtisanDashboard = ({ userName = "Priya" }) => {
  const navigate = useNavigate();
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
            onClick={() => navigate('/')}
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
            onClick={() => navigate('/add-craft')}
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
            onClick={() => navigate('/dashboard')}
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

          {/* My Showcase Button */}
          <button 
            className="action-btn showcase-btn"
            onClick={() => navigate('/showcase')}
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

export default ArtisanDashboard;