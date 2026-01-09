import { useState } from 'react';
import { CustomerFlow } from './components/CustomerFlow';
import { ArtisanFlow } from './components/ArtisanFlow';
import { AuthScreen } from './components/AuthScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Moon, Sun, User, Palette } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SavedArtisansProvider } from './contexts/SavedArtisansContext';

function AppContent() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showAuth, setShowAuth] = useState(false);
  const [authIntent, setAuthIntent] = useState<'buyer' | 'artisan' | null>(null);

  const currentView = user?.type === 'artisan' ? 'artisan' : 'customer';

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setAuthIntent(null);
  };

  const openLogin = () => {
    setAuthIntent(null);
    setShowAuth(true);
  };

  const openArtisanPortal = () => {
    if (user?.type === 'artisan') return;
    setAuthIntent('artisan');
    setShowAuth(true);
  };

  const handleWelcomeSelect = (role: 'artisan' | 'buyer' | 'browse') => {
    if (role === 'artisan') {
      // Open artisan login
      setAuthIntent('artisan');
      setShowAuth(true);
    } else if (role === 'buyer') {
      // Open buyer login
      setAuthIntent('buyer');
      setShowAuth(true);
    }
    // If 'browse', just continue (welcome screen auto-dismisses)
  };

  const isArtisan = user?.type === 'artisan';
  const buttonBaseClass = "flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:shadow-md transition-all flex-shrink-0";
  const iconClass = "w-4 h-4 md:w-5 md:h-5";

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Welcome Screen - First time only */}
      <WelcomeScreen onSelectRole={handleWelcomeSelect} />

      {showAuth && (
        <AuthScreen 
          onSuccess={handleAuthSuccess} 
          initialUserType={authIntent || 'buyer'}
        />
      )}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between gap-2 max-w-[100vw]">
          <div className="flex-shrink-0">
            <h1 className="text-base md:text-lg text-gray-900 dark:text-white">Kalaikatha</h1>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 md:p-3 bg-gray-100 dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className={`${iconClass} text-gray-700 dark:text-gray-300`} />
              ) : (
                <Sun className={`${iconClass} text-amber-400`} />
              )}
            </button>

            {/* Artisan Portal Button */}
            <button
              onClick={openArtisanPortal}
              className={`${buttonBaseClass} ${
                isArtisan
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              title={isArtisan ? 'Artisan Dashboard' : 'Login as Artisan'}
            >
              <Palette className={iconClass} />
              <span className="text-xs md:text-sm hidden sm:inline">
                {isArtisan ? 'Dashboard' : 'Artisan'}
              </span>
            </button>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full pl-2 pr-3 py-1.5 shadow-sm flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                />
                <span className="text-xs md:text-sm text-gray-900 dark:text-white hidden md:inline truncate max-w-[100px]">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className={`${buttonBaseClass} bg-gradient-to-r from-indigo-600 to-purple-600 text-white`}
              >
                <User className={iconClass} />
                <span className="text-xs md:text-sm">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
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