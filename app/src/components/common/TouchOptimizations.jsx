import React, { useState, useEffect, useRef, useCallback } from 'react';

// Touch gesture detection hook
const useTouch = (options = {}) => {
  const [touchState, setTouchState] = useState({
    isTouching: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    direction: null,
    distance: 0
  });

  const elementRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      isTouching: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY
    }));
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.isTouching) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    let direction = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setTouchState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
      direction,
      distance
    }));
  }, [touchState.isTouching, touchState.startX, touchState.startY]);

  const handleTouchEnd = useCallback(() => {
    setTouchState(prev => ({
      ...prev,
      isTouching: false
    }));
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return [elementRef, touchState];
};

// Swipeable component
const SwipeableContainer = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  threshold = 50,
  className = '',
  style = {}
}) => {
  const [ref, touchState] = useTouch();

  useEffect(() => {
    if (!touchState.isTouching && touchState.distance > threshold) {
      switch (touchState.direction) {
        case 'left':
          onSwipeLeft && onSwipeLeft();
          break;
        case 'right':
          onSwipeRight && onSwipeRight();
          break;
        case 'up':
          onSwipeUp && onSwipeUp();
          break;
        case 'down':
          onSwipeDown && onSwipeDown();
          break;
      }
    }
  }, [touchState, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

// Touch-friendly button component
const TouchButton = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  style = {},
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleTouchStart = (e) => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.touches[0].clientX - rect.left - size / 2;
    const y = e.touches[0].clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '8px 16px', fontSize: '14px', minHeight: '36px' };
      case 'large':
        return { padding: '16px 32px', fontSize: '18px', minHeight: '56px' };
      default:
        return { padding: '12px 24px', fontSize: '16px', minHeight: '48px' };
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden',
      outline: 'none',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent'
    };

    const variants = {
      primary: {
        backgroundColor: disabled ? '#cccccc' : '#E57373',
        color: 'white',
        transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)'
      },
      secondary: {
        backgroundColor: disabled ? '#f5f5f5' : 'white',
        color: disabled ? '#999' : '#333',
        border: `2px solid ${disabled ? '#ddd' : '#E57373'}`,
        transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)'
      },
      outline: {
        backgroundColor: 'transparent',
        color: disabled ? '#999' : '#E57373',
        border: `2px solid ${disabled ? '#ddd' : '#E57373'}`,
        transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)'
      }
    };

    return { ...baseStyles, ...variants[variant] };
  };

  return (
    <button
      className={`touch-button ${className}`}
      style={{
        ...getSizeStyles(),
        ...getVariantStyles(),
        ...style
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
          }}
        />
      ))}
      
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

// Touch-friendly input component
const TouchInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  className = '',
  style = {},
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = {
    width: '100%',
    padding: '16px',
    fontSize: '16px', // Prevent zoom on iOS
    border: `2px solid ${error ? '#ff4444' : isFocused ? '#E57373' : '#ddd'}`,
    borderRadius: '8px',
    backgroundColor: disabled ? '#f5f5f5' : 'white',
    color: disabled ? '#999' : '#333',
    outline: 'none',
    transition: 'all 0.3s ease',
    minHeight: '48px',
    boxSizing: 'border-box',
    WebkitAppearance: 'none', // Remove iOS styling
    ...style
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={disabled}
      className={`touch-input ${className}`}
      style={inputStyles}
      {...props}
    />
  );
};

// Accessibility enhancements for touch
const useTouchAccessibility = () => {
  useEffect(() => {
    // Announce touch interactions to screen readers
    const announceTouch = (message) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    // Add touch event listeners for accessibility
    const handleTouchStart = () => {
      document.body.classList.add('touch-mode');
      document.body.classList.remove('keyboard-mode');
    };

    const handleKeyDown = () => {
      document.body.classList.add('keyboard-mode');
      document.body.classList.remove('touch-mode');
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

// Touch feedback component
const TouchFeedback = ({ children, feedback = 'haptic', ...props }) => {
  const handleTouch = () => {
    // Haptic feedback (if supported)
    if (feedback === 'haptic' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Visual feedback is handled by CSS
  };

  return (
    <div
      onTouchStart={handleTouch}
      style={{
        WebkitTapHighlightColor: 'rgba(229, 115, 115, 0.2)',
        touchAction: 'manipulation'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  useTouch,
  SwipeableContainer,
  TouchButton,
  TouchInput,
  useTouchAccessibility,
  TouchFeedback
};