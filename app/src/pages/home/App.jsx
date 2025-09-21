/**
 * Main App component with routing and providers.
 */

import React from 'react';

// Simplified App for debugging
function App() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#2196F3',
      color: 'white',
      textAlign: 'center',
      minHeight: '100vh',
      fontSize: '18px'
    }}>
      <h1>🎨 Kalaikatha - Simplified App</h1>
      <p>This is the App component rendering successfully!</p>
      <p>If you see this, the App component is working.</p>
    </div>
  );
}

export default App;

// Performance and accessibility initialization
const AppInitializer = ({ children }) => {
  useEffect(() => {
    // Initialize performance monitoring and optimizations
    initializePerformance();
    
    // Add meta viewport if not present (for SSR compatibility)
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      document.head.appendChild(viewport);
    }
    
    // Add theme-color meta tag for mobile browsers
    if (!document.querySelector('meta[name="theme-color"]')) {
      const themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#E57373';
      document.head.appendChild(themeColor);
    }
  }, []);

  // Initialize touch accessibility
  useTouchAccessibility();

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AppInitializer>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <UserFlowProvider>
              <CartProvider>
                <div className="page-container container-viewport">
                  <Navigation />
                  <main className="main-content">
                    <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<CustomerHomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/artisan-dashboard" element={
                    <ProtectedRoute>
                      <ArtisanDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/add-product" element={
                    <ProtectedRoute>
                      <AddProductFlow />
                    </ProtectedRoute>
                  } />
                  <Route path="/fusion-craft" element={
                    <ProtectedRoute>
                      <FusionCraftPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* AI Tools Routes */}
                  <Route path="/ai-tools/content-generator" element={
                    <ProtectedRoute>
                      <ContentGeneratorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-tools/image-enhancer" element={
                    <ProtectedRoute>
                      <ImageEnhancerPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-tools/pricing-assistant" element={
                    <ProtectedRoute>
                      <PricingAssistantPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-tools/artist-collaboration" element={
                    <ProtectedRoute>
                      <ArtistCollaborationPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-tools/voice-assistant" element={
                    <ProtectedRoute>
                      <VoiceAssistantPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-tools/story-generator" element={
                    <ProtectedRoute>
                      <StoryGeneratorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai-tools/dashboard" element={
                    <ProtectedRoute>
                      <AIDashboardPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Development/Testing Routes */}
                  <Route path="/test/responsive" element={<ResponsiveTestPage />} />
                  <Route path="/test/firebase" element={<FirebaseTestPage />} />
                </Routes>
                  </main>
                </div>
              </CartProvider>
            </UserFlowProvider>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </AppInitializer>
  );
}
