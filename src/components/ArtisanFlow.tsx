import { lazy, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useArtisanFlow } from '../hooks/useArtisanFlow';
import { LoadingState } from './LoadingState';

// Lazy load artisan components
const ArtisanDashboard = lazy(() => import('./artisan/ArtisanDashboard').then(m => ({ default: m.ArtisanDashboard })));
const AIStudio = lazy(() => import('./artisan/AIStudio').then(m => ({ default: m.AIStudio })));
const BargainBot = lazy(() => import('./artisan/BargainBot').then(m => ({ default: m.BargainBot })));
const MarketingReview = lazy(() => import('./artisan/MarketingReview').then(m => ({ default: m.MarketingReview })));
const MyShop = lazy(() => import('./artisan/MyShop').then(m => ({ default: m.MyShop })));
const ProtectedVault = lazy(() => import('./artisan/ProtectedVault').then(m => ({ default: m.ProtectedVault })));
const CustomOrders = lazy(() => import('./artisan/CustomOrders').then(m => ({ default: m.CustomOrders })));
const GovernmentSchemes = lazy(() => import('./artisan/GovernmentSchemes').then(m => ({ default: m.GovernmentSchemes })));
const WhatsAppNotifications = lazy(() => import('./artisan/WhatsAppNotifications').then(m => ({ default: m.WhatsAppNotifications })));
const ArtisanOnboarding = lazy(() => import('./artisan/ArtisanOnboarding').then(m => ({ default: m.ArtisanOnboarding })));
const NameConfirmation = lazy(() => import('./artisan/NameConfirmation').then(m => ({ default: m.NameConfirmation })));
const LanguageSelection = lazy(() => import('./artisan/LanguageSelection').then(m => ({ default: m.LanguageSelection })));
const VaniNavigationAssistant = lazy(() => import('./artisan/VaniNavigationAssistant').then(m => ({ default: m.VaniNavigationAssistant })));

export function ArtisanFlow() {
  const { user } = useAuth();
  const {
    currentView,
    showNameConfirmation,
    showLanguageSelection,
    showOnboarding,
    isPhoneSignup,
    navigateTo,
    navigateToDashboard,
    handleNameConfirmationComplete,
    handleLanguageSelectionComplete,
    handleOnboardingComplete,
  } = useArtisanFlow();

  if (!user) return null;

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      <Suspense fallback={<LoadingState minimal />}>
        {/* Step 1: Name Confirmation - Shows first if needed */}
        {showNameConfirmation && (
          <NameConfirmation 
            onComplete={handleNameConfirmationComplete}
            isPhoneSignup={isPhoneSignup}
          />
        )}

        {/* Step 2: Language Selection - Shows after name */}
        {showLanguageSelection && !showNameConfirmation && (
          <LanguageSelection 
            onComplete={handleLanguageSelectionComplete}
            artisanName={user.name || 'Friend'}
          />
        )}

        {/* Step 3: Onboarding - Shows after language */}
        {showOnboarding && !showNameConfirmation && !showLanguageSelection && (
          <ArtisanOnboarding 
            onComplete={handleOnboardingComplete}
            artisanName={user.name || 'Friend'}
            selectedLanguage={localStorage.getItem('artisan_language') || 'en'}
          />
        )}
        
        {currentView === 'dashboard' && <ArtisanDashboard onNavigate={navigateTo} />}
        {currentView === 'studio' && <AIStudio onBack={navigateToDashboard} />}
        {currentView === 'bargain' && <BargainBot onBack={navigateToDashboard} />}
        {currentView === 'marketing' && <MarketingReview onBack={navigateToDashboard} />}
        {currentView === 'shop' && <MyShop onBack={navigateToDashboard} onNavigate={navigateTo} />}
        {currentView === 'vault' && <ProtectedVault onBack={navigateToDashboard} />}
        {currentView === 'orders' && <CustomOrders onBack={navigateToDashboard} />}
        {currentView === 'schemes' && <GovernmentSchemes onBack={navigateToDashboard} />}
        {currentView === 'whatsapp' && <WhatsAppNotifications onBack={navigateToDashboard} />}
        
        {/* Global Vani Navigation Assistant - Shows on all views after onboarding */}
        {!showNameConfirmation && !showLanguageSelection && !showOnboarding && (
          <VaniNavigationAssistant 
            onNavigate={navigateTo} 
            currentView={currentView}
          />
        )}
      </Suspense>
    </div>
  );
}