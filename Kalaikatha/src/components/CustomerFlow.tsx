import { useState } from 'react';
import { InteractiveMap } from './customer/InteractiveMap';
import { StateDrawer } from './customer/StateDrawer';
import { CraftDetails } from './customer/CraftDetails';
import { BuyerProfile } from './buyer/BuyerProfile';
import { CustomOrderForm } from './buyer/CustomOrderForm';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface CustomerFlowProps {
  onLoginRequired: () => void;
}

export function CustomerFlow({ onLoginRequired }: CustomerFlowProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCraft, setSelectedCraft] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const handleCraftSelect = (craft: any) => {
    // Allow viewing craft details without login
    setSelectedCraft(craft);
  };

  const handleCreateOrder = () => {
    setShowProfile(false);
    setShowOrderForm(true);
  };

  const handleCustomOrder = (artisanId: string) => {
    setSelectedArtisanId(artisanId);
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (order: any) => {
    console.log('Order submitted:', order);
    // In production, this would call your backend API
    setShowOrderForm(false);
    setSelectedArtisanId(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <InteractiveMap onStateSelect={setSelectedState} selectedState={selectedState} />
      
      <StateDrawer
        isOpen={!!selectedState && !selectedCraft}
        onClose={() => setSelectedState(null)}
        stateId={selectedState}
        onCraftSelect={handleCraftSelect}
      />

      <CraftDetails
        isOpen={!!selectedCraft}
        onClose={() => setSelectedCraft(null)}
        craft={selectedCraft}
        onMeetMakers={() => {}}
        onLoginRequired={onLoginRequired}
        onCustomOrder={handleCustomOrder}
      />

      {/* Floating User Profile Button (only when logged in as buyer) */}
      {isAuthenticated && user?.type === 'buyer' && !showProfile && !selectedCraft && (
        <button
          onClick={() => setShowProfile(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all z-30"
        >
          <User className="w-6 h-6" />
        </button>
      )}

      <BuyerProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onCreateOrder={handleCreateOrder}
      />

      <CustomOrderForm
        isOpen={showOrderForm}
        onClose={() => {
          setShowOrderForm(false);
          setSelectedArtisanId(null);
        }}
        onSubmit={handleOrderSubmit}
        artisanId={selectedArtisanId}
        craftId={selectedCraft?.id}
      />
    </div>
  );
}