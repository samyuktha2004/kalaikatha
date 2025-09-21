/**
 * Custom React hooks for responsive design
 * Provides clean, performant ways to handle responsive behavior in components
 */

import { useState, useEffect } from 'react';

// Breakpoint definitions (matching CSS)
export const BREAKPOINTS = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1400
};

/**
 * Hook to check if a media query matches
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const updateMatch = (event) => setMatches(event.matches);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch);
      return () => mediaQuery.removeEventListener('change', updateMatch);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(updateMatch);
      return () => mediaQuery.removeListener(updateMatch);
    }
  }, [query]);

  return matches;
};

/**
 * Hook to get current breakpoint
 * @returns {string} - Current breakpoint name (xs, sm, md, lg, xl, 2xl)
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (typeof window === 'undefined') return 'lg';
    
    const width = window.innerWidth;
    if (width < BREAKPOINTS.sm) return 'xs';
    if (width < BREAKPOINTS.md) return 'sm';
    if (width < BREAKPOINTS.lg) return 'md';
    if (width < BREAKPOINTS.xl) return 'lg';
    if (width < BREAKPOINTS['2xl']) return 'xl';
    return '2xl';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let newBreakpoint = '2xl';
      
      if (width < BREAKPOINTS.sm) newBreakpoint = 'xs';
      else if (width < BREAKPOINTS.md) newBreakpoint = 'sm';
      else if (width < BREAKPOINTS.lg) newBreakpoint = 'md';
      else if (width < BREAKPOINTS.xl) newBreakpoint = 'lg';
      else if (width < BREAKPOINTS['2xl']) newBreakpoint = 'xl';
      
      setBreakpoint(newBreakpoint);
    };

    const debouncedUpdate = debounce(updateBreakpoint, 100);
    window.addEventListener('resize', debouncedUpdate);
    
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, []);

  return breakpoint;
};

/**
 * Hook for mobile detection
 * @returns {boolean} - Whether screen is mobile size (< 768px)
 */
export const useIsMobile = () => {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
};

/**
 * Hook for tablet detection
 * @returns {boolean} - Whether screen is tablet size (768px - 991px)
 */
export const useIsTablet = () => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`);
};

/**
 * Hook for desktop detection
 * @returns {boolean} - Whether screen is desktop size (>= 992px)
 */
export const useIsDesktop = () => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
};

/**
 * Hook to get window dimensions
 * @returns {object} - { width, height }
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1200, height: 800 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Hook for responsive value selection
 * @param {object} values - Object with breakpoint keys and values
 * @returns {any} - Value for current breakpoint
 */
export const useResponsiveValue = (values) => {
  const breakpoint = useBreakpoint();
  
  // Find the appropriate value for current breakpoint
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  
  // Look for value at current breakpoint or fall back to smaller ones
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  // Fallback to default or first available value
  return values.default || Object.values(values)[0];
};

/**
 * Hook for viewport-based responsive behavior
 * @param {object} config - Configuration object with viewport ranges
 * @returns {string} - Current viewport category
 */
export const useViewport = (config = {}) => {
  const defaultConfig = {
    mobile: { max: 767 },
    tablet: { min: 768, max: 1023 },
    desktop: { min: 1024 }
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  const { width } = useWindowSize();
  
  for (const [category, range] of Object.entries(finalConfig)) {
    const { min = 0, max = Infinity } = range;
    if (width >= min && width <= max) {
      return category;
    }
  }
  
  return 'unknown';
};

/**
 * Hook for orientation detection
 * @returns {string} - 'portrait' or 'landscape'
 */
export const useOrientation = () => {
  const { width, height } = useWindowSize();
  return width > height ? 'landscape' : 'portrait';
};

/**
 * Hook for safe area handling (useful for mobile notches)
 * @returns {object} - Safe area insets
 */
export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSafeArea = () => {
      const computedStyle = window.getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
        right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0')
      });
    };

    updateSafeArea();
    window.addEventListener('orientationchange', updateSafeArea);
    return () => window.removeEventListener('orientationchange', updateSafeArea);
  }, []);

  return safeArea;
};

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export all hooks as default
export default {
  useMediaQuery,
  useBreakpoint,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useWindowSize,
  useResponsiveValue,
  useViewport,
  useOrientation,
  useSafeArea,
  BREAKPOINTS
};