import { AuthScreen } from './components/AuthScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TopBar } from './components/TopBar';
import { CustomerFlow } from './components/CustomerFlow';
import { ArtisanFlow } from './components/ArtisanFlow';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SavedArtisansProvider } from './contexts/SavedArtisansContext';
import { useAuthModal } from './hooks/useAuthModal';

function AppContent() {
  const { user } = useAuth();
  const { showAuth, authIntent, openLogin, openArtisanLogin, openBuyerLogin, handleAuthSuccess } = useAuthModal();

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
      <WelcomeScreen onSelectRole={handleWelcomeSelect} />

      {showAuth && (
        <AuthScreen 
          onSuccess={handleAuthSuccess} 
          initialUserType={authIntent || 'buyer'}
        />
      )}

      <TopBar 
        onLoginClick={openLogin}
        onArtisanPortalClick={handleArtisanPortalClick}
      />

      <div className="pt-16">
        {currentView === 'customer' ? (
          <CustomerFlow onLoginRequired={openLogin} />
        ) : (
          <ArtisanFlow />
        )}
      </div>
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