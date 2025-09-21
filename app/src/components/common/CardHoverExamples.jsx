import React from 'react';
import { UniversalCard, IconCard, useCardHover, HOVER_VARIANTS } from './UniversalCardHover';

/**
 * Card Hover Examples Component
 * Demonstrates all available hover effects for cards
 */
const CardHoverExamples = () => {
  
  // Example of using the hook directly
  const { hoverHandlers, hoverStyles } = useCardHover(HOVER_VARIANTS.dynamic);

  return (
    <div style={{ 
      padding: 'var(--space-xl, 2rem)',
      backgroundColor: 'var(--dominant-color)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'var(--secondary-color)',
          marginBottom: 'var(--space-xl)',
          fontSize: 'clamp(2rem, 5vw, 3rem)'
        }}>
          Universal Card Hover System
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-2xl)',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          maxWidth: '600px',
          margin: '0 auto var(--space-2xl) auto'
        }}>
          Consistent, accessible hover effects optimized for artisan users across all devices
        </p>

        {/* Hover Variants Grid */}
        <div className="card-grid">
          
          {/* Subtle Hover */}
          <UniversalCard 
            variant="subtle"
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon">✨</div>
            <h3 className="card-title">Subtle Hover</h3>
            <p className="card-description">
              Minimal shadow elevation. Perfect for content cards where distraction should be minimal.
            </p>
            <code style={{ 
              background: '#f5f5f5', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              variant="subtle"
            </code>
          </UniversalCard>

          {/* Standard Hover */}
          <UniversalCard 
            variant="standard"
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon">🎯</div>
            <h3 className="card-title">Standard Hover</h3>
            <p className="card-description">
              Balanced scale and elevation. Good default for most interactive cards.
            </p>
            <code style={{ 
              background: '#f5f5f5', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              variant="standard"
            </code>
          </UniversalCard>

          {/* Artisan Hover (Recommended) */}
          <UniversalCard 
            variant="artisan"
            style={{ textAlign: 'center', border: '2px solid var(--accent-color)' }}
          >
            <div className="card-icon">🏺</div>
            <h3 className="card-title">Artisan Hover ⭐</h3>
            <p className="card-description">
              Optimized for local artisans. Smooth animation with clear visual feedback.
            </p>
            <code style={{ 
              background: '#f5f5f5', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              variant="artisan"
            </code>
          </UniversalCard>

          {/* Dynamic Hover */}
          <UniversalCard 
            variant="dynamic"
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon">🚀</div>
            <h3 className="card-title">Dynamic Hover</h3>
            <p className="card-description">
              More pronounced effect. Great for call-to-action cards and featured content.
            </p>
            <code style={{ 
              background: '#f5f5f5', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              variant="dynamic"
            </code>
          </UniversalCard>

          {/* Performance Hover */}
          <UniversalCard 
            variant="performance"
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Performance Hover</h3>
            <p className="card-description">
              Shadow-only effect. Best for low-end devices or when many cards are present.
            </p>
            <code style={{ 
              background: '#f5f5f5', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              variant="performance"
            </code>
          </UniversalCard>

          {/* Custom Hook Example */}
          <div 
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              padding: 'var(--space-lg)',
              textAlign: 'center',
              cursor: 'pointer',
              ...hoverStyles
            }}
            {...hoverHandlers}
          >
            <div className="card-icon">🛠️</div>
            <h3 className="card-title">Custom Hook</h3>
            <p className="card-description">
              Using useCardHover hook directly for complete control over styling.
            </p>
            <code style={{ 
              background: '#f5f5f5', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              useCardHover()
            </code>
          </div>
        </div>

        {/* Icon Cards Section */}
        <h2 style={{ 
          textAlign: 'center', 
          color: 'var(--secondary-color)',
          margin: 'var(--space-2xl) 0 var(--space-xl) 0',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          Icon Cards
        </h2>

        <div className="card-grid">
          <IconCard
            icon="🎨"
            title="Art Tools"
            description="Digital tools for creating beautiful artwork"
            variant="artisan"
            onClick={() => alert('Clicked Art Tools!')}
          />
          
          <IconCard
            icon="📱"
            title="Mobile First"
            description="Optimized for mobile and touch devices"
            variant="standard"
            href="#mobile"
          />
          
          <IconCard
            icon="♿"
            title="Accessible"
            description="Built with accessibility in mind from the ground up"
            variant="subtle"
          />
        </div>

        {/* CSS Class Examples */}
        <h2 style={{ 
          textAlign: 'center', 
          color: 'var(--secondary-color)',
          margin: 'var(--space-2xl) 0 var(--space-xl) 0',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          CSS Class Usage
        </h2>

        <div className="card-grid">
          <div className="universal-card card-hover-artisan" style={{ textAlign: 'center' }}>
            <div className="card-icon">📝</div>
            <h3 className="card-title">CSS Classes</h3>
            <p className="card-description">
              Use CSS classes directly: <br />
              <code>universal-card card-hover-artisan</code>
            </p>
          </div>

          <div className="product-card" style={{ textAlign: 'center' }}>
            <div className="card-icon">🛍️</div>
            <h3 className="card-title">Product Card</h3>
            <p className="card-description">
              Automatic styling: <br />
              <code>product-card</code>
            </p>
          </div>

          <div className="tool-card" style={{ textAlign: 'center' }}>
            <div className="card-icon">🔧</div>
            <h3 className="card-title">Tool Card</h3>
            <p className="card-description">
              Automatic styling: <br />
              <code>tool-card</code>
            </p>
          </div>
        </div>

        {/* Usage Instructions */}
        <div style={{ 
          marginTop: 'var(--space-2xl)',
          padding: 'var(--space-xl)',
          backgroundColor: 'rgba(192, 121, 90, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(192, 121, 90, 0.2)'
        }}>
          <h3 style={{ 
            color: 'var(--secondary-color)',
            marginBottom: 'var(--space-lg)',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)'
          }}>
            How to Use
          </h3>
          
          <div style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: '1.6' }}>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: 'var(--space-sm)' }}>
              1. Import the system:
            </h4>
            <pre style={{ 
              background: '#f8f8f8', 
              padding: 'var(--space-md)', 
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem'
            }}>
{`import { UniversalCard, IconCard, useCardHover } from './components/common';`}
            </pre>

            <h4 style={{ color: 'var(--secondary-color)', margin: 'var(--space-lg) 0 var(--space-sm) 0' }}>
              2. Use components:
            </h4>
            <pre style={{ 
              background: '#f8f8f8', 
              padding: 'var(--space-md)', 
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem'
            }}>
{`<UniversalCard variant="artisan">
  Content here
</UniversalCard>

<IconCard 
  icon="🎨" 
  title="Art Tools" 
  description="Create beautiful art"
  variant="artisan"
/>`}
            </pre>

            <h4 style={{ color: 'var(--secondary-color)', margin: 'var(--space-lg) 0 var(--space-sm) 0' }}>
              3. Or use CSS classes:
            </h4>
            <pre style={{ 
              background: '#f8f8f8', 
              padding: 'var(--space-md)', 
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '0.85rem'
            }}>
{`<div className="universal-card card-hover-artisan">
  Content here
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHoverExamples;