import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserFlowPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      backgroundColor: '#2d3748',
      minHeight: '100vh',
      color: 'white',
      padding: '40px'
    }}>
      <button
        onClick={() => navigate('/')}
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

export default UserFlowPage;