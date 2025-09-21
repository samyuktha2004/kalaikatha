import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCardHover } from './UniversalCardHover';

// Skeleton loader component
const ToolCardSkeleton = memo(() => (
  <div className="responsive-card responsive-skeleton" style={{ height: '200px' }}>
    <div className="responsive-skeleton" style={{ height: '60px', width: '60px', borderRadius: '50%', marginBottom: '15px' }}></div>
    <div className="responsive-skeleton" style={{ height: '24px', marginBottom: '10px' }}></div>
    <div className="responsive-skeleton" style={{ height: '16px', marginBottom: '8px' }}></div>
    <div className="responsive-skeleton" style={{ height: '16px', width: '80%' }}></div>
  </div>
));

// Individual tool card component with unified hover effects
const ToolCard = memo(({ tool, text, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use the universal card hover system with artisan-friendly settings
  const { isHovered, hoverHandlers, hoverStyles } = useCardHover({
    scaleOnHover: true,
    elevateOnHover: true,
    customScale: 1.03,
    customElevation: '0 8px 25px rgba(192, 121, 90, 0.2)',
    animationDuration: '0.3s',
    animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  });

  const cardStyle = {
    textDecoration: 'none',
    backgroundColor: 'var(--card-bg, #ffffff)',
    border: '2px solid var(--card-border, rgba(192, 121, 90, 0.2))',
    borderRadius: '20px',
    padding: 'var(--space-lg)',
    display: 'block',
    animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
    borderColor: isHovered ? 'var(--secondary-color)' : 'var(--card-border)',
    ...hoverStyles
  };

  return (
    <Link 
      to={tool.path}
      className="universal-card tool-card card-hover-artisan"
      style={cardStyle}
      {...hoverHandlers}
    >
      <div className="card-icon tool-icon" style={{ 
        fontSize: 'clamp(40px, 8vw, 60px)', 
        marginBottom: 'var(--space-md)',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {tool.icon}
      </div>
      <h3 className="card-title tool-title" style={{ 
        color: 'var(--secondary-color)',
        marginBottom: 'var(--space-sm)',
        lineHeight: '1.3',
        fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
        fontWeight: '600'
      }}>
        {text.features[tool.key]}
      </h3>
      <p className="card-description tool-description" style={{ 
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
        margin: 0,
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
      }}>
        {tool.description[text.language] || tool.description['en-IN']}
      </p>
    </Link>
  );
});

// Main AI Tools Grid Component
const AIToolsGrid = memo(({ text, gridColumns, isLoading }) => {
  const tools = [
    {
      key: 'contentGenerator',
      path: '/ai-tools/content-generator',
      icon: '✍️',
      description: {
        'en-IN': 'Generate compelling stories and product descriptions for your crafts',
        'hi-IN': 'अपने शिल्प के लिए आकर्षक कहानियां और उत्पाद विवरण बनाएं'
      }
    },
    {
      key: 'imageEnhancer',
      path: '/ai-tools/image-enhancer',
      icon: '📸',
      description: {
        'en-IN': 'Enhance and optimize your product photos with AI',
        'hi-IN': 'AI के साथ अपनी उत्पाद तस्वीरों को बेहतर बनाएं'
      }
    },
    {
      key: 'pricingAssistant',
      path: '/ai-tools/pricing-assistant',
      icon: '💰',
      description: {
        'en-IN': 'Get fair pricing recommendations for your handmade products',
        'hi-IN': 'अपने हस्तनिर्मित उत्पादों के लिए उचित मूल्य सुझाव प्राप्त करें'
      }
    },
    {
      key: 'artistCollaboration',
      path: '/ai-tools/artist-collaboration',
      icon: '🤝',
      description: {
        'en-IN': 'Connect with like-minded artisans and collaborate',
        'hi-IN': 'समान विचारधारा वाले कारीगरों से जुड़ें और सहयोग करें'
      }
    },
    {
      key: 'voiceAssistant',
      path: '/ai-tools/voice-assistant',
      icon: '🎤',
      description: {
        'en-IN': 'Voice-powered assistant for hands-free crafting support',
        'hi-IN': 'हाथ-मुक्त शिल्प सहायता के लिए आवाज़-संचालित सहायक'
      }
    },
    {
      key: 'dashboard',
      path: '/ai-tools/dashboard',
      icon: '📊',
      description: {
        'en-IN': 'Comprehensive business analytics and insights dashboard',
        'hi-IN': 'व्यापक व्यापारिक विश्लेषण और अंतर्दृष्टि डैशबोर्ड'
      }
    }
  ];

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: 'var(--grid-gap)',
    padding: '0 var(--container-padding) var(--space-3xl)',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  if (isLoading) {
    return (
      <div style={gridStyle}>
        {Array.from({ length: 6 }, (_, index) => (
          <ToolCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="responsive-grid ai-tools-grid" style={gridStyle}>
      {tools.map((tool, index) => (
        <ToolCard 
          key={tool.key} 
          tool={tool} 
          text={text} 
          index={index}
        />
      ))}
    </div>
  );
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

export default AIToolsGrid;