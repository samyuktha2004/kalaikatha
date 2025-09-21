import { useState, useEffect } from 'react';

/**
 * Device Detection Hook
 * Provides comprehensive device and browser information
 */
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    type: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    os: 'unknown',
    browser: 'unknown'
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Device type detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;

    // OS detection
    let os = 'unknown';
    if (/Windows/i.test(userAgent)) os = 'Windows';
    else if (/Mac/i.test(userAgent)) os = 'macOS';
    else if (/Linux/i.test(userAgent)) os = 'Linux';
    else if (/Android/i.test(userAgent)) os = 'Android';
    else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS';

    // Browser detection
    let browser = 'unknown';
    if (/Chrome/i.test(userAgent)) browser = 'Chrome';
    else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/Safari/i.test(userAgent)) browser = 'Safari';
    else if (/Edge/i.test(userAgent)) browser = 'Edge';
    else if (/Opera/i.test(userAgent)) browser = 'Opera';

    const type = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    setDeviceInfo({
      type,
      isMobile,
      isTablet,
      isDesktop,
      hasTouch,
      os,
      browser
    });
  }, []);

  return deviceInfo;
};

/**
 * Responsive Breakpoints Hook
 * Tracks active breakpoints based on viewport width
 */
export const useResponsiveBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isMobileLarge: false,
    isMobileXL: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isDesktopXL: false,
    current: 'desktop'
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      const isMobile = width >= 320;
      const isMobileLarge = width >= 375;
      const isMobileXL = width >= 425;
      const isTablet = width >= 768;
      const isLaptop = width >= 1024;
      const isDesktop = width >= 1440;
      const isDesktopXL = width >= 1920;

      let current = 'mobile';
      if (isDesktopXL) current = 'desktop-xl';
      else if (isDesktop) current = 'desktop';
      else if (isLaptop) current = 'laptop';
      else if (isTablet) current = 'tablet';
      else if (isMobileXL) current = 'mobile-xl';
      else if (isMobileLarge) current = 'mobile-large';

      setBreakpoints({
        isMobile,
        isMobileLarge,
        isMobileXL,
        isTablet,
        isLaptop,
        isDesktop,
        isDesktopXL,
        current
      });
    };

    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
};

/**
 * Viewport Tracking Hook
 * Provides detailed viewport information
 */
export const useViewportTracking = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: (window.innerWidth / window.innerHeight).toFixed(2),
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    pixelRatio: window.devicePixelRatio || 1
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = (width / height).toFixed(2);
      const orientation = width > height ? 'landscape' : 'portrait';
      const pixelRatio = window.devicePixelRatio || 1;

      setViewport({
        width,
        height,
        aspectRatio,
        orientation,
        pixelRatio
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
};

/**
 * Media Query Hook
 * Custom hook for responsive design with CSS media queries
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

/**
 * Responsive Grid Columns Hook
 * Calculates optimal grid columns based on screen size
 */
export const useResponsiveGridColumns = (options = {}) => {
  const {
    mobile = 1,
    mobileLarge = 2,
    tablet = 3,
    laptop = 4,
    desktop = 5,
    desktopXL = 6
  } = options;

  const breakpoints = useResponsiveBreakpoints();

  const getColumns = () => {
    if (breakpoints.isDesktopXL) return desktopXL;
    if (breakpoints.isDesktop) return desktop;
    if (breakpoints.isLaptop) return laptop;
    if (breakpoints.isTablet) return tablet;
    if (breakpoints.isMobileLarge) return mobileLarge;
    return mobile;
  };

  return getColumns();
};

/**
 * Container Padding Hook
 * Provides responsive container padding based on screen size
 */
export const useResponsiveContainerPadding = () => {
  const breakpoints = useResponsiveBreakpoints();

  const getPadding = () => {
    if (breakpoints.isDesktop) return '3rem';
    if (breakpoints.isLaptop) return '2rem';
    if (breakpoints.isTablet) return '1.5rem';
    return '1rem';
  };

  return getPadding();
};

/**
 * Font Size Hook
 * Provides responsive font sizes based on screen size
 */
export const useResponsiveFontSize = (baseSize = '1rem') => {
  const breakpoints = useResponsiveBreakpoints();
  
  const getFontSize = () => {
    const base = parseFloat(baseSize);
    
    if (breakpoints.isDesktopXL) return `${base * 1.25}rem`;
    if (breakpoints.isDesktop) return `${base * 1.1}rem`;
    if (breakpoints.isLaptop) return `${base}rem`;
    if (breakpoints.isTablet) return `${base * 0.95}rem`;
    return `${base * 0.9}rem`;
  };

  return getFontSize();
};

export default {
  useDeviceDetection,
  useResponsiveBreakpoints,
  useViewportTracking,
  useMediaQuery,
  useResponsiveGridColumns,
  useResponsiveContainerPadding,
  useResponsiveFontSize
};