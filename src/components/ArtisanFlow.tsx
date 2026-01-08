import { ArtisanDashboard } from './artisan/ArtisanDashboard';
import { AIStudio } from './artisan/AIStudio';
import { BargainBot } from './artisan/BargainBot';
import { MarketingReview } from './artisan/MarketingReview';
import { MyShop } from './artisan/MyShop';
import { ProtectedVault } from './artisan/ProtectedVault';
import { CustomOrders } from './artisan/CustomOrders';
import { GovernmentSchemes } from './artisan/GovernmentSchemes';
import { ArtisanOnboarding } from './artisan/ArtisanOnboarding';
import { NameConfirmation } from './artisan/NameConfirmation';
import { LanguageSelection } from './artisan/LanguageSelection';
import { useAuth } from '../contexts/AuthContext';
import { useArtisanFlow } from '../hooks/useArtisanFlow';

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
        />
      )}
      
      {currentView === 'dashboard' && <ArtisanDashboard onNavigate={navigateTo} />}
      {currentView === 'studio' && <AIStudio onBack={navigateToDashboard} />}
      {currentView === 'bargain' && <BargainBot onBack={navigateToDashboard} />}
      {currentView === 'marketing' && <MarketingReview onBack={navigateToDashboard} />}
      {currentView === 'shop' && <MyShop onBack={navigateToDashboard} />}
      {currentView === 'vault' && <ProtectedVault onBack={navigateToDashboard} />}
      {currentView === 'orders' && <CustomOrders onBack={navigateToDashboard} />}
      {currentView === 'schemes' && <GovernmentSchemes onBack={navigateToDashboard} />}
    </div>
  );
}