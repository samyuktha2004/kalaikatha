/**
 * Main App component - Simplified for debugging
 */

import React from 'react';

// Simplified App for debugging
function App() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#2196F3',
      color: 'white',
      textAlign: 'center',
      minHeight: '100vh',
      fontSize: '18px'
    }}>
      <h1>🎨 Kalaikatha - Simplified App</h1>
      <p>This is the App component rendering successfully!</p>
      <p>If you see this, the App component is working.</p>
      <button 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'white',
          color: '#2196F3',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => alert('Button clicked! React events working!')}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;