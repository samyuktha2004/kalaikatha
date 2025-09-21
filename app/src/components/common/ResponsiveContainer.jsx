/**
 * ResponsiveContainer Component
 * Demonstrates responsive design patterns with overflow protection
 */

import React from 'react';
import { useIsMobile, useIsDesktop, useBreakpoint, useResponsiveValue } from '../../hooks/useResponsive';

const ResponsiveContainer = ({ children, className = '', variant = 'default', ...props }) => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const breakpoint = useBreakpoint();
  
  // Responsive padding values
  const padding = useResponsiveValue({
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem'
  });
  
  // Responsive max-width values
  const maxWidth = useResponsiveValue({
    xs: '100%',
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px'
  });
  
  // Container variants
  const getVariantClasses = () => {
    const baseClasses = 'container-safe overflow-hidden';
    
    switch (variant) {
      case 'fluid':
        return `${baseClasses} w-full max-w-full`;
      case 'centered':
        return `${baseClasses} mx-auto`;
      case 'constrained':
        return `${baseClasses} max-w-4xl mx-auto`;
      case 'card':
        return `${baseClasses} responsive-card`;
      default:
        return baseClasses;
    }
  };
  
  const containerStyle = {
    padding,
    maxWidth: variant === 'fluid' ? '100%' : maxWidth,
    margin: variant === 'centered' || variant === 'constrained' ? '0 auto' : undefined,
    ...props.style
  };
  
  return (
    <div 
      className={`${getVariantClasses()} ${className}`}
      style={containerStyle}
      data-breakpoint={breakpoint}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ResponsiveGrid Component
 * Auto-adjusting grid with overflow protection
 */
export const ResponsiveGrid = ({ 
  children, 
  className = '', 
  minItemWidth = '250px',
  gap = '1rem',
  ...props 
}) => {
  const isMobile = useIsMobile();
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile 
      ? '1fr' 
      : `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    gap,
    width: '100%',
    overflow: 'hidden',
    ...props.style
  };
  
  return (
    <div 
      className={`overflow-x-hidden ${className}`}
      style={gridStyle}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ResponsiveFlex Component
 * Flexible layout that adapts to screen size
 */
export const ResponsiveFlex = ({ 
  children, 
  className = '', 
  direction = 'responsive', // 'row', 'column', 'responsive'
  gap = '1rem',
  wrap = true,
  align = 'center',
  justify = 'flex-start',
  ...props 
}) => {
  const isMobile = useIsMobile();
  
  // Determine flex direction
  const getFlexDirection = () => {
    if (direction === 'responsive') {
      return isMobile ? 'column' : 'row';
    }
    return direction;
  };
  
  const flexStyle = {
    display: 'flex',
    flexDirection: getFlexDirection(),
    gap,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: align,
    justifyContent: justify,
    width: '100%',
    overflow: 'hidden',
    ...props.style
  };
  
  const responsiveClasses = isMobile ? 'flex-col-mobile' : 'flex-row-desktop';
  
  return (
    <div 
      className={`overflow-x-hidden ${responsiveClasses} ${className}`}
      style={flexStyle}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ResponsiveText Component
 * Text that scales appropriately with screen size
 */
export const ResponsiveText = ({ 
  children, 
  className = '', 
  variant = 'body',
  truncate = false,
  ...props 
}) => {
  const breakpoint = useBreakpoint();
  
  // Get text size based on variant and breakpoint
  const getTextClasses = () => {
    const baseClasses = 'responsive-text';
    const truncateClasses = truncate ? 'overflow-hidden whitespace-nowrap text-ellipsis' : '';
    
    let sizeClasses = '';
    switch (variant) {
      case 'heading1':
        sizeClasses = 'heading-1';
        break;
      case 'heading2':
        sizeClasses = 'heading-2';
        break;
      case 'heading3':
        sizeClasses = 'heading-3';
        break;
      case 'large':
        sizeClasses = 'text-lg';
        break;
      case 'small':
        sizeClasses = 'text-sm';
        break;
      case 'caption':
        sizeClasses = 'text-xs';
        break;
      default:
        sizeClasses = 'text-base';
    }
    
    return `${baseClasses} ${sizeClasses} ${truncateClasses}`;
  };
  
  const textStyle = {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    ...props.style
  };
  
  return (
    <div 
      className={`${getTextClasses()} ${className}`}
      style={textStyle}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ResponsiveImage Component
 * Images with proper responsive behavior and overflow protection
 */
export const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'auto',
  objectFit = 'cover',
  ...props 
}) => {
  const containerStyle = {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
    ...props.containerStyle
  };
  
  const imageStyle = {
    width: '100%',
    height: aspectRatio !== 'auto' ? '100%' : 'auto',
    objectFit,
    display: 'block',
    ...props.style
  };
  
  return (
    <div className={`overflow-hidden ${props.containerClassName || ''}`} style={containerStyle}>
      <img 
        src={src}
        alt={alt}
        className={`w-full h-auto ${className}`}
        style={imageStyle}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

/**
 * OverflowContainer Component
 * Container with scrollable content and proper overflow handling
 */
export const OverflowContainer = ({ 
  children, 
  className = '', 
  maxHeight = '400px',
  scrollDirection = 'vertical', // 'vertical', 'horizontal', 'both'
  showScrollbar = true,
  ...props 
}) => {
  const getOverflowClasses = () => {
    let classes = '';
    
    switch (scrollDirection) {
      case 'horizontal':
        classes = showScrollbar ? 'overflow-x-auto overflow-y-hidden' : 'overflow-x-scroll overflow-y-hidden';
        break;
      case 'both':
        classes = showScrollbar ? 'overflow-auto' : 'overflow-scroll';
        break;
      default: // vertical
        classes = showScrollbar ? 'overflow-y-auto overflow-x-hidden' : 'overflow-y-scroll overflow-x-hidden';
    }
    
    return classes;
  };
  
  const containerStyle = {
    maxHeight,
    width: '100%',
    ...props.style
  };
  
  return (
    <div 
      className={`${getOverflowClasses()} ${className}`}
      style={containerStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
export { ResponsiveContainer };