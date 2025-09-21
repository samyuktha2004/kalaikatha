import React, { memo, useState, useRef, useEffect } from 'react';

// Intersection Observer hook for lazy loading
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting];
};

// Optimized Image Component with lazy loading
const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  style = {},
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0xMiAxNkwyMCAxMkwyOCAxNlYyOEgyOFYxNloiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+',
  ...props 
}) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  const imageStyle = {
    ...style,
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0,
    filter: isLoaded ? 'none' : 'blur(2px)'
  };

  return (
    <div ref={ref} className={`responsive-image-container ${className}`} style={{ position: 'relative' }}>
      {/* Placeholder */}
      <img
        src={placeholder}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
        aria-hidden="true"
      />
      
      {/* Actual Image */}
      {(isIntersecting || isLoaded) && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#f5f5f5',
          color: '#999',
          fontSize: '14px'
        }}>
          Image failed to load
        </div>
      )}
    </div>
  );
});

// Lazy Section Component
const LazySection = memo(({ children, className = '', minHeight = '200px', ...props }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isIntersecting, hasLoaded]);

  return (
    <section ref={ref} className={className} style={{ minHeight }} {...props}>
      {hasLoaded || isIntersecting ? children : (
        <div className="responsive-skeleton" style={{ height: minHeight, borderRadius: '8px' }} />
      )}
    </section>
  );
});

// Progressive Web App functionality
const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return { isInstallable, installPWA };
};

// Performance monitoring hook
const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Performance Observer for long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Not supported in all browsers
      }

      return () => observer.disconnect();
    }
  }, []);
};

// Network status hook
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Network Information API
    if ('connection' in navigator) {
      setConnection(navigator.connection);
      
      const handleConnectionChange = () => {
        setConnection(navigator.connection);
      };
      
      navigator.connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        navigator.connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connection };
};

// Preload resources
const preloadResource = (href, as = 'script', crossOrigin = false) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossOrigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

// Critical CSS injection
const injectCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

export {
  OptimizedImage,
  LazySection,
  usePWA,
  usePerformanceMonitor,
  useNetworkStatus,
  useIntersectionObserver,
  preloadResource,
  injectCriticalCSS
};