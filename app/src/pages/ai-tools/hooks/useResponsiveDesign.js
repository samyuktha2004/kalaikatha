import { useState, useEffect, useCallback } from 'react';

export const useResponsiveDesign = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 480 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 480 && window.innerWidth < 768 : false
  });

  const updateScreenSize = useCallback(() => {
    const width = window.innerWidth;
    setScreenSize({
      width,
      isMobile: width < 480,
      isTablet: width >= 480 && width < 768
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use throttled resize handler for better performance
    let timeoutId = null;
    const throttledResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 150);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [updateScreenSize]);

  const getFontSize = useCallback((baseFontSize = '2.2rem') => {
    if (screenSize.isMobile) return '1.8rem';
    if (screenSize.isTablet) return '2rem';
    return baseFontSize;
  }, [screenSize]);

  const getOptimalViewMode = useCallback(() => {
    return screenSize.isMobile ? 'compact' : 'full';
  }, [screenSize]);

  return {
    screenSize,
    getFontSize,
    getOptimalViewMode,
    isMobile: screenSize.isMobile,
    isTablet: screenSize.isTablet
  };
};