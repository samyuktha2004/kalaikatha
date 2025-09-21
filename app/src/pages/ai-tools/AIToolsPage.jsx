import React from 'react';
import { useNavigate } from 'react-router-dom';

const AIToolsPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      backgroundColor: '#3c4859',
      minHeight: '100vh',
      color: 'white'
    }}>
      <button
        onClick={() => navigate('/')}
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

export default AIToolsPage;