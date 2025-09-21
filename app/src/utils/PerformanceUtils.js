// SSR-ready utilities and performance optimizations
import React from 'react';

// Server-Side Rendering preparation
const SSRUtils = {
  // Check if code is running on server
  isServer: typeof window === 'undefined',
  
  // Safe window access
  getWindow: () => {
    return typeof window !== 'undefined' ? window : null;
  },
  
  // Safe document access
  getDocument: () => {
    return typeof document !== 'undefined' ? document : null;
  },
  
  // Safe localStorage access
  getLocalStorage: () => {
    try {
      return typeof localStorage !== 'undefined' ? localStorage : null;
    } catch (e) {
      return null;
    }
  },
  
  // Safe sessionStorage access
  getSessionStorage: () => {
    try {
      return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
    } catch (e) {
      return null;
    }
  },
  
  // Get user agent safely
  getUserAgent: () => {
    const window = SSRUtils.getWindow();
    return window?.navigator?.userAgent || '';
  },
  
  // Device detection
  isMobile: () => {
    const userAgent = SSRUtils.getUserAgent();
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  },
  
  // Preload critical resources
  preloadCriticalResources: () => {
    const document = SSRUtils.getDocument();
    if (!document) return;
    
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontPreload.as = 'style';
    fontPreload.onload = () => {
      fontPreload.rel = 'stylesheet';
    };
    document.head.appendChild(fontPreload);
    
    // Preload critical API endpoints
    const apiPreload = document.createElement('link');
    apiPreload.rel = 'dns-prefetch';
    apiPreload.href = 'https://api.kalaikatha.com';
    document.head.appendChild(apiPreload);
  },
  
  // Critical CSS injection
  injectCriticalCSS: (css) => {
    const document = SSRUtils.getDocument();
    if (!document) return;
    
    const style = document.createElement('style');
    style.textContent = css;
    style.id = 'critical-css';
    document.head.appendChild(style);
  }
};

// Performance monitoring and optimization
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }

  init() {
    if (SSRUtils.isServer) return;
    
    this.observePageLoad();
    this.observeLongTasks();
    this.observeLayoutShifts();
    this.observeLargestContentfulPaint();
  }

  // Monitor page load performance
  observePageLoad() {
    const window = SSRUtils.getWindow();
    if (!window) return;
    
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      this.metrics.loadTime = loadTime;
      this.metrics.domContentLoaded = domContentLoaded;
      
      console.log('Page Load Metrics:', {
        loadTime: `${loadTime}ms`,
        domContentLoaded: `${domContentLoaded}ms`
      });
    });
  }

  // Observe long tasks (>50ms)
  observeLongTasks() {
    const window = SSRUtils.getWindow();
    if (!window || !window.PerformanceObserver) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (e) {
      console.warn('Long task observation not supported');
    }
  }

  // Observe Cumulative Layout Shift
  observeLayoutShifts() {
    const window = SSRUtils.getWindow();
    if (!window || !window.PerformanceObserver) return;
    
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (e) {
      console.warn('Layout shift observation not supported');
    }
  }

  // Observe Largest Contentful Paint
  observeLargestContentfulPaint() {
    const window = SSRUtils.getWindow();
    if (!window || !window.PerformanceObserver) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log(`LCP: ${lastEntry.startTime}ms`);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    } catch (e) {
      console.warn('LCP observation not supported');
    }
  }

  // Get all metrics
  getMetrics() {
    return this.metrics;
  }

  // Cleanup observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Code splitting utilities
const CodeSplittingUtils = {
  // Dynamic import with error handling
  dynamicImport: async (importFn, fallback = null) => {
    try {
      const module = await importFn();
      return module.default || module;
    } catch (error) {
      console.error('Dynamic import failed:', error);
      return fallback;
    }
  },
  
  // Preload a module
  preloadModule: (importFn) => {
    if (SSRUtils.isServer) return;
    
    // Use webpack's webpackPreload magic comment in production
    importFn().catch(() => {
      // Ignore preload errors
    });
  },
  
  // Route-based code splitting helper
  createAsyncRoute: (importFn, LoadingComponent = null, ErrorComponent = null) => {
    return React.lazy(() => 
      importFn().catch(error => {
        console.error('Route loading failed:', error);
        return { default: ErrorComponent || (() => React.createElement('div', null, 'Failed to load page')) };
      })
    );
  }
};

// Image optimization utilities
const ImageOptimization = {
  // Generate responsive image URLs
  getResponsiveImageUrl: (baseUrl, width, quality = 85) => {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width);
    url.searchParams.set('q', quality);
    url.searchParams.set('f', 'webp');
    return url.toString();
  },
  
  // Generate srcSet for responsive images
  generateSrcSet: (baseUrl, sizes = [320, 640, 768, 1024, 1280, 1920]) => {
    return sizes
      .map(size => `${ImageOptimization.getResponsiveImageUrl(baseUrl, size)} ${size}w`)
      .join(', ');
  },
  
  // Determine optimal image size based on container
  getOptimalImageSize: (containerWidth, devicePixelRatio = 1) => {
    const targetWidth = containerWidth * devicePixelRatio;
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    
    // Find the smallest size that's larger than the target
    return sizes.find(size => size >= targetWidth) || sizes[sizes.length - 1];
  },
  
  // Lazy load image with intersection observer
  lazyLoadImage: (img, options = {}) => {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      img.src = img.dataset.src;
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
      ...options
    });
    
    observer.observe(img);
  }
};

// Service Worker utilities for PWA
const ServiceWorkerUtils = {
  // Register service worker
  register: async (swPath = '/sw.js') => {
    if (SSRUtils.isServer || !('serviceWorker' in navigator)) {
      return null;
    }
    
    try {
      const registration = await navigator.serviceWorker.register(swPath);
      console.log('SW registered:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              ServiceWorkerUtils.notifyUpdate();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('SW registration failed:', error);
      return null;
    }
  },
  
  // Notify user of app update
  notifyUpdate: () => {
    // Create update notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 16px;
        border-radius: 8px;
        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <span>New version available!</span>
        <button onclick="window.location.reload()" style="
          background: #E57373;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        ">Update</button>
      </div>
    `;
    document.body.appendChild(notification);
  },
  
  // Cache critical resources
  cacheCriticalResources: async () => {
    if (!('caches' in window)) return;
    
    try {
      const cache = await caches.open('kalaikatha-v1');
      const criticalResources = [
        '/',
        '/static/css/main.css',
        '/static/js/main.js',
        '/manifest.json'
      ];
      
      await cache.addAll(criticalResources);
      console.log('Critical resources cached');
    } catch (error) {
      console.error('Caching failed:', error);
    }
  }
};

// Memory optimization utilities
const MemoryOptimization = {
  // Cleanup unused resources
  cleanup: () => {
    // Remove unused event listeners
    const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
    unusedElements.forEach(element => {
      element.remove();
    });
    
    // Clear unused caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('old-') || name.includes('unused-')) {
            caches.delete(name);
          }
        });
      });
    }
  },
  
  // Monitor memory usage
  monitorMemory: () => {
    if (!('performance' in window) || !('memory' in performance)) {
      return null;
    }
    
    const memInfo = performance.memory;
    const usage = {
      used: Math.round(memInfo.usedJSHeapSize / 1048576), // MB
      total: Math.round(memInfo.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) // MB
    };
    
    console.log('Memory usage:', usage);
    return usage;
  }
};

// Initialize performance monitoring
let performanceMonitor = null;

const initializePerformance = () => {
  if (!SSRUtils.isServer && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
    
    // Preload critical resources
    SSRUtils.preloadCriticalResources();
    
    // Register service worker
    ServiceWorkerUtils.register();
    
    // Cache critical resources
    ServiceWorkerUtils.cacheCriticalResources();
    
    // Monitor memory periodically
    setInterval(() => {
      MemoryOptimization.monitorMemory();
    }, 30000); // Every 30 seconds
  }
};

export {
  SSRUtils,
  PerformanceMonitor,
  CodeSplittingUtils,
  ImageOptimization,
  ServiceWorkerUtils,
  MemoryOptimization,
  initializePerformance
};