import { useState, useEffect } from 'react';
import { ArtisanDashboard } from './artisan/ArtisanDashboard';
import { AIStudio } from './artisan/AIStudio';
import { BargainBot } from './artisan/BargainBot';
import { MarketingReview } from './artisan/MarketingReview';
import { MyShop } from './artisan/MyShop';
import { ProtectedVault } from './artisan/ProtectedVault';
import { CustomOrders } from './artisan/CustomOrders';
import { ArtisanOnboarding } from './artisan/ArtisanOnboarding';
import { useAuth } from '../contexts/AuthContext';

export function ArtisanFlow() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'studio' | 'bargain' | 'marketing' | 'shop' | 'vault' | 'orders'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check if artisan has completed onboarding
    const hasOnboarded = localStorage.getItem('kalaikatha_artisan_onboarded');
    if (!hasOnboarded && user) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
      {showOnboarding && user && (
        <ArtisanOnboarding 
          onComplete={handleOnboardingComplete}
          artisanName={user.name || 'Friend'}
        />
      )}
      
      {currentView === 'dashboard' && <ArtisanDashboard onNavigate={setCurrentView} />}
      {currentView === 'studio' && <AIStudio onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'bargain' && <BargainBot onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'marketing' && <MarketingReview onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'shop' && <MyShop onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'vault' && <ProtectedVault onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'orders' && <CustomOrders onBack={() => setCurrentView('dashboard')} />}
    </div>
  );
}