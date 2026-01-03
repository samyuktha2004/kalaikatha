import { useState } from 'react';
import { ArtisanDashboard } from './artisan/ArtisanDashboard';
import { AIStudio } from './artisan/AIStudio';
import { BargainBot } from './artisan/BargainBot';
import { MarketingReview } from './artisan/MarketingReview';
import { MyShop } from './artisan/MyShop';
import { ProtectedVault } from './artisan/ProtectedVault';
import { CustomOrders } from './artisan/CustomOrders';

export function ArtisanFlow() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'studio' | 'bargain' | 'marketing' | 'shop' | 'vault' | 'orders'>('dashboard');

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
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