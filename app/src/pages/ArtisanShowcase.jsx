import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtisanShowcase = () => {
  const navigate = useNavigate();
  return (
    <div className="artisan-showcase-container">
      {/* Navigation Bar */}
      <nav className="showcase-nav">
        <div className="nav-content">
          <div className="logo">
            🏺 Kalaikatha
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/')} className="nav-link">Home</button>
            <button onClick={() => navigate('/dashboard')} className="nav-link">Dashboard</button>
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

export default ArtisanShowcase;