import { lazy, Suspense, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SavedArtisansProvider } from './contexts/SavedArtisansContext';
import { useAuthModal } from './hooks/useAuthModal';
import { LoadingState } from './components/LoadingState';
import { autoCleanStorage } from './utils/performance';
import { Toaster } from 'sonner@2.0.3';

// Lazy load heavy components
const AuthScreen = lazy(() => import('./components/AuthScreen').then(m => ({ default: m.AuthScreen })));
const WelcomeScreen = lazy(() => import('./components/WelcomeScreen').then(m => ({ default: m.WelcomeScreen })));
const TopBar = lazy(() => import('./components/TopBar').then(m => ({ default: m.TopBar })));
const CustomerFlow = lazy(() => import('./components/CustomerFlow').then(m => ({ default: m.CustomerFlow })));
const ArtisanFlow = lazy(() => import('./components/ArtisanFlow').then(m => ({ default: m.ArtisanFlow })));

function AppContent() {
  const { user } = useAuth();
  const { showAuth, authIntent, openLogin, openArtisanLogin, openBuyerLogin, handleAuthSuccess } = useAuthModal();

  // Clean storage on app load
  useEffect(() => {
    autoCleanStorage();
  }, []);

  const handleWelcomeSelect = (role: 'artisan' | 'buyer' | 'browse') => {
    if (role === 'artisan') {
      openArtisanLogin();
    } else if (role === 'buyer') {
      openBuyerLogin();
    }
  };

  const handleArtisanPortalClick = () => {
    if (user?.type !== 'artisan') {
      openArtisanLogin();
    }
  };

  const currentView = user?.type === 'artisan' ? 'artisan' : 'customer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Suspense fallback={null}>
        <WelcomeScreen onSelectRole={handleWelcomeSelect} />
      </Suspense>

      {showAuth && (
        <Suspense fallback={<LoadingState minimal />}>
          <AuthScreen 
            onSuccess={handleAuthSuccess} 
            initialUserType={authIntent || 'buyer'}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <TopBar 
          onLoginClick={openLogin}
          onArtisanPortalClick={handleArtisanPortalClick}
        />
      </Suspense>

      <div className="pt-16">
        <Suspense fallback={<LoadingState message="Loading..." />}>
          {currentView === 'customer' ? (
            <CustomerFlow onLoginRequired={openBuyerLogin} />
          ) : (
            <ArtisanFlow />
          )}
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SavedArtisansProvider>
          <AppContent />
        </SavedArtisansProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}