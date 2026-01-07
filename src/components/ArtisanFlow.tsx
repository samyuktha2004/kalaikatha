import { ArtisanDashboard } from './artisan/ArtisanDashboard';
import { AIStudio } from './artisan/AIStudio';
import { BargainBot } from './artisan/BargainBot';
import { MarketingReview } from './artisan/MarketingReview';
import { MyShop } from './artisan/MyShop';
import { ProtectedVault } from './artisan/ProtectedVault';
import { CustomOrders } from './artisan/CustomOrders';
import { ArtisanOnboarding } from './artisan/ArtisanOnboarding';
import { NameConfirmation } from './artisan/NameConfirmation';
import { useAuth } from '../contexts/AuthContext';
import { useArtisanFlow } from '../hooks/useArtisanFlow';

export function ArtisanFlow() {
  const { user } = useAuth();
  const {
    currentView,
    showNameConfirmation,
    showOnboarding,
    isPhoneSignup,
    navigateTo,
    navigateToDashboard,
    handleNameConfirmationComplete,
    handleOnboardingComplete,
  } = useArtisanFlow();

  if (!user) return null;

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      {/* Name Confirmation - Shows first if needed */}
      {showNameConfirmation && (
        <NameConfirmation 
          onComplete={handleNameConfirmationComplete}
          isPhoneSignup={isPhoneSignup}
        />
      )}

      {/* Onboarding - Shows after name confirmation */}
      {showOnboarding && !showNameConfirmation && (
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
    </div>
  );
}