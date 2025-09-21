import React from 'react';

const SimpleTest = () => {
  console.log('SimpleTest component rendering...');
  
  return React.createElement('div', {
    style: { 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    React.createElement('h1', { 
      key: 'title',
      style: { color: '#333', fontSize: '2rem' }
    }, '🔥 DEBUG: React Is Working!'),
    React.createElement('p', { 
      key: 'text',
      style: { fontSize: '1.2rem', color: '#666' }
    }, 'If you can see this, React is rendering properly.'),
    React.createElement('p', { 
      key: 'time',
      style: { fontSize: '1rem', color: '#999' }
    }, `Current time: ${new Date().toLocaleTimeString()}`)
  ]);
};

export default SimpleTest;