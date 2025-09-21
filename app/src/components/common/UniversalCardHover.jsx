import React, { useState, forwardRef } from 'react';

/**
 * Universal Card Hover Effect Hook
 * Provides consistent hover behavior across all cards
 */
export const useCardHover = (options = {}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    scaleOnHover = true,
    elevateOnHover = true,
    customScale = 1.02,
    customElevation = '0 8px 25px rgba(192, 121, 90, 0.2)',
    animationDuration = '0.3s',
    animationEasing = 'ease'
  } = options;

  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false)
  };

  const hoverStyles = {
    transform: isHovered && scaleOnHover 
      ? `translateY(-4px) scale(${customScale})` 
      : 'translateY(0) scale(1)',
    boxShadow: isHovered && elevateOnHover 
      ? customElevation 
      : 'var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1))',
    transition: `all ${animationDuration} ${animationEasing}`,
  };

  return {
    isHovered,
    hoverHandlers,
    hoverStyles
  };
};

/**
 * Pre-configured hover effect variants
 */
export const HOVER_VARIANTS = {
  // Subtle hover - minimal movement
  subtle: {
    scaleOnHover: false,
    elevateOnHover: true,
    customElevation: '0 4px 15px rgba(192, 121, 90, 0.15)',
    animationDuration: '0.25s'
  },
  
  // Standard hover - balanced effect
  standard: {
    scaleOnHover: true,
    elevateOnHover: true,
    customScale: 1.02,
    customElevation: '0 8px 25px rgba(192, 121, 90, 0.2)',
    animationDuration: '0.3s'
  },
  
  // Dynamic hover - more pronounced
  dynamic: {
    scaleOnHover: true,
    elevateOnHover: true,
    customScale: 1.05,
    customElevation: '0 12px 35px rgba(192, 121, 90, 0.25)',
    animationDuration: '0.35s'
  },
  
  // Artisan-friendly - larger scale for better visual feedback
  artisan: {
    scaleOnHover: true,
    elevateOnHover: true,
    customScale: 1.03,
    customElevation: '0 8px 25px rgba(192, 121, 90, 0.2)',
    animationDuration: '0.3s',
    animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // Performance optimized - no scale, shadow only
  performance: {
    scaleOnHover: false,
    elevateOnHover: true,
    customElevation: '0 6px 20px rgba(192, 121, 90, 0.18)',
    animationDuration: '0.2s'
  }
};

/**
 * Universal Card Component with built-in hover effects
 */
export const UniversalCard = forwardRef(({
  children,
  variant = 'standard',
  className = '',
  style = {},
  onClick,
  href,
  to,
  as: Component = 'div',
  disabled = false,
  customHoverOptions = {},
  ...props
}, ref) => {
  
  // Merge variant with custom options
  const hoverOptions = variant === 'custom' 
    ? customHoverOptions 
    : { ...HOVER_VARIANTS[variant], ...customHoverOptions };
  
  const { hoverHandlers, hoverStyles } = useCardHover(hoverOptions);

  // Base card styles
  const baseStyles = {
    backgroundColor: 'var(--card-bg, #ffffff)',
    border: '1px solid var(--card-border, #e0e0e0)',
    borderRadius: '12px',
    padding: 'var(--space-lg, 1.5rem)',
    cursor: (onClick || href || to) && !disabled ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    ...hoverStyles,
    ...style
  };

  // Determine the component to render
  let CardComponent = Component;
  if (href) CardComponent = 'a';
  if (to) CardComponent = 'div'; // Will be wrapped with Link if needed

  const cardProps = {
    ref,
    className: `universal-card ${className}`,
    style: baseStyles,
    onClick: disabled ? undefined : onClick,
    href: disabled ? undefined : href,
    ...(disabled ? {} : hoverHandlers),
    ...props
  };

  return (
    <CardComponent {...cardProps}>
      {children}
    </CardComponent>
  );
});

UniversalCard.displayName = 'UniversalCard';

/**
 * Card with icon hover effect (for tool cards, etc.)
 */
export const IconCard = forwardRef(({
  icon,
  title,
  description,
  iconSize = '48px',
  variant = 'artisan',
  ...props
}, ref) => {
  const { isHovered } = useCardHover(HOVER_VARIANTS[variant]);

  return (
    <UniversalCard ref={ref} variant={variant} {...props}>
      <div 
        style={{ 
          fontSize: iconSize,
          marginBottom: 'var(--space-md, 1rem)',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {icon}
      </div>
      {title && (
        <h3 style={{ 
          margin: '0 0 var(--space-sm, 0.5rem) 0',
          color: 'var(--text-primary)',
          fontSize: 'var(--text-lg, 1.25rem)',
          fontWeight: '600'
        }}>
          {title}
        </h3>
      )}
      {description && (
        <p style={{ 
          margin: 0,
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-base, 1rem)',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      )}
    </UniversalCard>
  );
});

IconCard.displayName = 'IconCard';

/**
 * CSS-only hover effects for when you prefer CSS classes
 */
export const CARD_HOVER_CSS = `
/* Universal Card Hover Effects */
.card-hover-subtle {
  transition: all 0.25s ease;
  box-shadow: var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1));
}

.card-hover-subtle:hover {
  box-shadow: 0 4px 15px rgba(192, 121, 90, 0.15);
}

.card-hover-standard {
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1));
}

.card-hover-standard:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 25px rgba(192, 121, 90, 0.2);
}

.card-hover-dynamic {
  transition: all 0.35s ease;
  box-shadow: var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1));
}

.card-hover-dynamic:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 12px 35px rgba(192, 121, 90, 0.25);
}

.card-hover-artisan {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1));
}

.card-hover-artisan:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 25px rgba(192, 121, 90, 0.2);
}

.card-hover-performance {
  transition: box-shadow 0.2s ease;
  box-shadow: var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1));
}

.card-hover-performance:hover {
  box-shadow: 0 6px 20px rgba(192, 121, 90, 0.18);
}

/* Accessibility: Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .card-hover-subtle:hover,
  .card-hover-standard:hover,
  .card-hover-dynamic:hover,
  .card-hover-artisan:hover {
    transform: none;
  }
}

/* Touch devices: Remove hover effects */
@media (hover: none) {
  .card-hover-subtle:hover,
  .card-hover-standard:hover,
  .card-hover-dynamic:hover,
  .card-hover-artisan:hover,
  .card-hover-performance:hover {
    transform: none;
    box-shadow: var(--card-shadow, 0 2px 8px rgba(192, 121, 90, 0.1));
  }
}
`;

/**
 * Utility function to inject hover CSS into document
 */
export const injectCardHoverCSS = () => {
  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('universal-card-hover-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'universal-card-hover-styles';
      style.textContent = CARD_HOVER_CSS;
      document.head.appendChild(style);
    }
  }
};

export default UniversalCard;