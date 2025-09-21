import React, { useState, useEffect } from 'react';

const ColorPaletteDemo = () => {
  const [currentTheme, setCurrentTheme] = useState('60-30-10');

  const themes = {
    '60-30-10': {
      '--dominant-color': '#f4f0e4',
      '--secondary-color': '#c0795a',
      '--accent-color': '#8b4513'
    },
    default: {
      '--dominant-color': '#ffffff',
      '--secondary-color': '#667eea',
      '--accent-color': '#ff6b6b'
    },
    purple: {
      '--dominant-color': '#f8f7ff',
      '--secondary-color': '#8b5cf6',
      '--accent-color': '#f59e0b'
    },
    green: {
      '--dominant-color': '#f0fdf4',
      '--secondary-color': '#10b981',
      '--accent-color': '#ef4444'
    },
    ocean: {
      '--dominant-color': '#f0f9ff',
      '--secondary-color': '#0ea5e9',
      '--accent-color': '#f97316'
    }
  };

  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
      
      // Update related colors for complete theme application
      if (property === '--dominant-color') {
        root.style.setProperty('--bg-primary', value);
        root.style.setProperty('--card-bg', value);
        root.style.setProperty('--input-bg', value);
      }
      if (property === '--secondary-color') {
        root.style.setProperty('--nav-background', value);
        root.style.setProperty('--header-primary', value);
        root.style.setProperty('--btn-secondary-bg', value);
      }
      if (property === '--accent-color') {
        root.style.setProperty('--btn-primary-bg', value);
        root.style.setProperty('--text-link', value);
        root.style.setProperty('--border-focus', value);
      }
    });
    
    setCurrentTheme(themeName);
  };

  // Apply the 60-30-10 theme on component mount
  useEffect(() => {
    applyTheme('60-30-10');
  }, []);

  return (
    <div style={{
      padding: 'var(--fluid-space-lg)',
      background: 'var(--bg-primary)',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-md)',
      margin: 'var(--fluid-space-md)'
    }}>
      <h2 style={{ 
        color: 'var(--header-primary)',
        marginBottom: 'var(--fluid-space-md)'
      }}>
        🎨 60-30-10 Color Rule Demo
      </h2>
      
      <p style={{ 
        color: 'var(--text-secondary)',
        marginBottom: 'var(--fluid-space-lg)'
      }}>
        <strong>60%</strong> Dominant (#f4f0e4) • <strong>30%</strong> Secondary (#c0795a) • <strong>10%</strong> Accent (#8b4513)
        <br />
        Click themes below to see the 60-30-10 rule in action!
      </p>
      
      <div style={{
        display: 'flex',
        gap: 'var(--fluid-space-sm)',
        flexWrap: 'wrap',
        marginBottom: 'var(--fluid-space-lg)'
      }}>
        {Object.keys(themes).map(themeName => (
          <button
            key={themeName}
            onClick={() => applyTheme(themeName)}
            className={`btn ${currentTheme === themeName ? 'btn-primary' : 'btn-secondary'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {themeName === '60-30-10' ? '🏺 Kalaikatha' :
             themeName === 'default' ? '🌊 Default' : 
             themeName === 'purple' ? '💜 Purple' :
             themeName === 'green' ? '💚 Green' : '🌊 Ocean'} 
          </button>
        ))}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--fluid-space-md)',
        marginTop: 'var(--fluid-space-lg)'
      }}>
        <div style={{
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          padding: 'var(--fluid-space-md)',
          borderRadius: '6px',
          textAlign: 'center',
          border: '1px solid var(--border-light)'
        }}>
          <strong>60% - Dominant</strong><br />
          Backgrounds & Containers<br />
          <small style={{ color: 'var(--text-muted)' }}>var(--bg-primary)</small>
        </div>
        
        <div style={{
          background: 'var(--nav-background)',
          color: 'var(--nav-text)',
          padding: 'var(--fluid-space-md)',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <strong>30% - Secondary</strong><br />
          Headers & Navigation<br />
          <small style={{ color: 'var(--nav-text-hover)' }}>var(--nav-background)</small>
        </div>
        
        <div style={{
          background: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-text)',
          padding: 'var(--fluid-space-md)',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <strong>10% - Accent</strong><br />
          CTAs & Important Elements<br />
          <small style={{ opacity: 0.9 }}>var(--btn-primary-bg)</small>
        </div>
        
        <div style={{
          background: 'var(--status-success)',
          color: 'var(--text-inverse)',
          padding: 'var(--fluid-space-md)',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <strong>Supporting Color</strong><br />
          Success States<br />
          <small style={{ opacity: 0.9 }}>var(--status-success)</small>
        </div>
      </div>
      
      <div style={{
        marginTop: 'var(--fluid-space-lg)',
        padding: 'var(--fluid-space-md)',
        background: 'var(--bg-secondary)',
        borderRadius: '6px',
        borderLeft: '4px solid var(--brand-primary)'
      }}>
        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
          🎨 60-30-10 Color Rule
        </h4>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
          <strong>60%</strong> Dominant color (#f4f0e4) for backgrounds and large areas<br />
          <strong>30%</strong> Secondary color (#c0795a) for headers and navigation<br />
          <strong>10%</strong> Accent color (#8b4513) for CTAs, buttons, and important elements<br />
          <small>This creates visual hierarchy and balanced, professional design!</small>
        </p>
      </div>
    </div>
  );
};

export default ColorPaletteDemo;