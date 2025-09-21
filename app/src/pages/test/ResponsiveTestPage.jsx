import React, { useState, useEffect } from 'react';
import { TouchButton, SwipeableContainer } from '../../components/common/TouchOptimizations';
import { OptimizedImage, useNetworkStatus } from '../../components/common/PerformanceOptimizations';

const ResponsiveTestPage = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });
  const [deviceType, setDeviceType] = useState('desktop');
  const [testResults, setTestResults] = useState({});
  const { isOnline, connection } = useNetworkStatus();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({ width, height });
      
      // Determine device type
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else if (width < 1440) setDeviceType('laptop');
      else setDeviceType('desktop');
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runResponsiveTests = () => {
    const results = {
      viewport: viewport,
      deviceType: deviceType,
      breakpoints: {
        mobile: viewport.width >= 320,
        tablet: viewport.width >= 768,
        laptop: viewport.width >= 1024,
        desktop: viewport.width >= 1440
      },
      touchSupport: 'ontouchstart' in window,
      retina: window.devicePixelRatio > 1,
      orientation: viewport.width > viewport.height ? 'landscape' : 'portrait',
      networkStatus: {
        online: isOnline,
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 'unknown'
      },
      features: {
        cssGrid: CSS.supports('display', 'grid'),
        cssFlexbox: CSS.supports('display', 'flex'),
        cssVariables: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window,
        serviceWorker: 'serviceWorker' in navigator,
        webp: false // Will be tested dynamically
      }
    };

    // Test WebP support
    const webp = new Image();
    webp.onload = webp.onerror = () => {
      results.features.webp = webp.height === 2;
      setTestResults(results);
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  const getBreakpointStatus = (breakpoint) => {
    switch (breakpoint) {
      case 'mobile':
        return viewport.width >= 320 ? '✅ Pass' : '❌ Fail';
      case 'tablet':
        return viewport.width >= 768 ? '✅ Pass' : '❌ Fail';
      case 'laptop':
        return viewport.width >= 1024 ? '✅ Pass' : '❌ Fail';
      case 'desktop':
        return viewport.width >= 1440 ? '✅ Pass' : '❌ Fail';
      default:
        return '❓ Unknown';
    }
  };

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    alert(`Swipe ${direction} detected! 👍`);
  };

  return (
    <div className="responsive-container" style={{
      padding: 'var(--space-lg)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 className="responsive-heading">Responsive Design Test Suite</h1>
      
      {/* Viewport Information */}
      <section className="responsive-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Viewport Information</h2>
        <div className="responsive-grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-md)'
        }}>
          <div>
            <strong>Width:</strong> {viewport.width}px
          </div>
          <div>
            <strong>Height:</strong> {viewport.height}px
          </div>
          <div>
            <strong>Device Type:</strong> {deviceType}
          </div>
          <div>
            <strong>Pixel Ratio:</strong> {window.devicePixelRatio || 1}x
          </div>
        </div>
      </section>

      {/* Breakpoint Tests */}
      <section className="responsive-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Breakpoint Tests</h2>
        <div className="responsive-grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-md)'
        }}>
          <div>Mobile (320px+): {getBreakpointStatus('mobile')}</div>
          <div>Tablet (768px+): {getBreakpointStatus('tablet')}</div>
          <div>Laptop (1024px+): {getBreakpointStatus('laptop')}</div>
          <div>Desktop (1440px+): {getBreakpointStatus('desktop')}</div>
        </div>
      </section>

      {/* Touch Test */}
      <section className="responsive-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Touch & Gesture Tests</h2>
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
          <TouchButton onClick={() => alert('Touch button works!')} variant="primary">
            Touch Me!
          </TouchButton>
          <TouchButton onClick={() => alert('Secondary button works!')} variant="secondary">
            Secondary
          </TouchButton>
          <TouchButton onClick={() => alert('Outline button works!')} variant="outline">
            Outline
          </TouchButton>
        </div>
        
        <SwipeableContainer
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
          onSwipeUp={() => handleSwipe('up')}
          onSwipeDown={() => handleSwipe('down')}
          style={{
            background: '#f0f0f0',
            padding: 'var(--space-xl)',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #ccc'
          }}
        >
          👆 Swipe in any direction to test gesture recognition
        </SwipeableContainer>
      </section>

      {/* Image Optimization Test */}
      <section className="responsive-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Image Optimization Test</h2>
        <div className="responsive-grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-md)'
        }}>
          <div>
            <h3>Optimized Image (Lazy Load)</h3>
            <OptimizedImage
              src="https://picsum.photos/400/300"
              alt="Test optimized image"
              width={200}
              height={150}
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div>
            <h3>Regular Image</h3>
            <img
              src="https://picsum.photos/400/300?random=2"
              alt="Regular image"
              style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>

      {/* Performance Test */}
      <section className="responsive-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Performance & Feature Detection</h2>
        <TouchButton onClick={runResponsiveTests} variant="primary" style={{ marginBottom: 'var(--space-md)' }}>
          Run Tests
        </TouchButton>
        
        {Object.keys(testResults).length > 0 && (
          <div>
            <h3>Test Results:</h3>
            <pre style={{
              background: '#f5f5f5',
              padding: 'var(--space-md)',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </section>

      {/* Network Status */}
      <section className="responsive-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Network Status</h2>
        <div className="responsive-grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--space-md)'
        }}>
          <div>
            <strong>Status:</strong> {isOnline ? '🟢 Online' : '🔴 Offline'}
          </div>
          <div>
            <strong>Connection:</strong> {connection?.effectiveType || 'Unknown'}
          </div>
          <div>
            <strong>Downlink:</strong> {connection?.downlink ? `${connection.downlink} Mbps` : 'Unknown'}
          </div>
        </div>
      </section>

      {/* Responsive Grid Demo */}
      <section className="responsive-card">
        <h2 className="responsive-subheading">Responsive Grid Demo</h2>
        <div className="responsive-grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--space-md)'
        }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{
              background: `hsl(${i * 45}, 70%, 80%)`,
              padding: 'var(--space-md)',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#333'
            }}>
              Card {i + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Typography Scale Demo */}
      <section className="responsive-card" style={{ marginTop: 'var(--space-lg)' }}>
        <h2 className="responsive-subheading">Responsive Typography</h2>
        <div>
          <h1 className="responsive-heading">Heading 1 (Responsive)</h1>
          <h2 className="responsive-subheading">Heading 2 (Responsive)</h2>
          <p className="responsive-body">Body text that scales responsively with viewport size.</p>
          <small className="responsive-caption">Caption text for additional information.</small>
        </div>
      </section>

      <style>{`
        /* Device-specific optimizations */
        @media (max-width: 767px) {
          .mobile-hide { display: none !important; }
          .mobile-stack { flex-direction: column !important; }
        }
        
        @media (min-width: 768px) {
          .tablet-show { display: block !important; }
        }
        
        @media (min-width: 1024px) {
          .desktop-grid { 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important; 
          }
        }
        
        /* Print optimizations */
        @media print {
          .no-print { display: none !important; }
          .responsive-card { 
            box-shadow: none !important; 
            border: 1px solid #000 !important; 
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveTestPage;