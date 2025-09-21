import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './index.css';
import { UserFlowProvider, useUserFlow } from './contexts/UserFlowContext';
import { AuthProvider, useAuth } from './services/AuthContext';

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage'));
const ArtisanDashboard = lazy(() => import('./pages/dashboard/ArtisanDashboard'));
const AddNewCraftFlow = lazy(() => import('./pages/AddNewCraftFlow'));
const ArtisanShowcase = lazy(() => import('./pages/ArtisanShowcase'));
const ArtisanCollaborationFlow = lazy(() => import('./pages/collaboration/ArtisanCollaborationFlow'));
const AIToolsPage = lazy(() => import('./pages/ai-tools/AIToolsPage'));
const UserFlowPage = lazy(() => import('./pages/flows/UserFlowPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const MyCraftsPage = lazy(() => import('./pages/products/MyCraftsPage'));

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#8B4513'
  }}>
    <div>🎨 Loading Kalaikatha...</div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Main App Router Component
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicRoute>
          <HomePage />
        </PublicRoute>
      } />
      
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/signup" element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      } />
      
      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      } />
      
      {/* Public Showcase Route (doesn't require authentication) */}
      <Route path="/showcase/:userId" element={<ArtisanShowcase />} />
      
      {/* Protected Routes - require authentication */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardFlow />
        </ProtectedRoute>
      } />
      
      <Route path="/add-craft" element={
        <ProtectedRoute>
          <AddNewCraftFlow />
        </ProtectedRoute>
      } />
      
      <Route path="/my-crafts" element={
        <ProtectedRoute>
          <MyCraftsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/collaboration" element={
        <ProtectedRoute>
          <ArtisanCollaborationFlow />
        </ProtectedRoute>
      } />
      
      <Route path="/showcase" element={
        <ProtectedRoute>
          <ArtisanShowcase />
        </ProtectedRoute>
      } />
      
      {/* AI Tools Routes */}
      <Route path="/ai-tools/*" element={
        <ProtectedRoute>
          <AIToolsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/user-flow" element={
        <ProtectedRoute>
          <UserFlowPage />
        </ProtectedRoute>
      } />
      
      {/* Catch all - redirect to appropriate page based on auth state */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Dashboard Flow Component with New Product Decision Logic
const DashboardFlow = () => {
  const { flowState } = useUserFlow();
  const navigate = useNavigate();
  const [showNewProductDecision, setShowNewProductDecision] = React.useState(false);

  // Handle new product decision
  const handleNewProductDecision = (isNewProduct) => {
    setShowNewProductDecision(false);
    if (isNewProduct) {
      navigate('/add-craft');
    } else {
      navigate('/my-crafts');
    }
  };

  return (
    <div className="dashboard-flow">
      {/* New Product Decision Modal */}
      {showNewProductDecision && (
        <div className="decision-modal-overlay">
          <div className="decision-modal">
            <h2>What would you like to do?</h2>
            <p>Choose your next action:</p>
            
            <div className="decision-buttons">
              <button 
                className="decision-btn new-product"
                onClick={() => handleNewProductDecision(true)}
              >
                <div className="btn-icon">🎨</div>
                <div className="btn-content">
                  <h3>Add New Craft</h3>
                  <p>Create a new product listing</p>
                </div>
              </button>
              
              <button 
                className="decision-btn existing-product"
                onClick={() => handleNewProductDecision(false)}
              >
                <div className="btn-icon">📋</div>
                <div className="btn-content">
                  <h3>View My Crafts</h3>
                  <p>Manage existing products</p>
                </div>
              </button>
            </div>
            
            <button 
              className="decision-close"
              onClick={() => setShowNewProductDecision(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* Main Dashboard */}
      <ArtisanDashboard onShowDecision={() => setShowNewProductDecision(true)} />
    </div>
  );
};

// Navigation Bar Component
const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <nav className="main-navigation">
      <div className="nav-content">
        <div className="nav-left">
          <button 
            className="logo-btn"
            onClick={() => navigate('/dashboard')}
          >
            🏺 Kalaikatha
          </button>
        </div>
        
        <div className="nav-center">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/my-crafts')}>My Crafts</button>
          <button onClick={() => navigate('/collaboration')}>Find Partners</button>
          <button onClick={() => navigate('/showcase')}>My Showcase</button>
        </div>
        
        <div className="nav-right">
          <div className="user-info">
            <span>👤 {user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <UserFlowProvider>
        <BrowserRouter>
          <div className="app-container">
            <NavigationBar />
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <AppRouter />
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </UserFlowProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);