import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import type { ArtisanView } from '../utils/constants';

export function useArtisanFlow() {
  const [currentView, setCurrentView] = useState<ArtisanView>('dashboard');
  const [showNameConfirmation, setShowNameConfirmation] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user } = useAuth();

  const isPhoneSignup = user ? (!user.email.includes('@') || !user.name || user.name.trim() === '') : false;

  useEffect(() => {
    if (!user) return;

    if (!storage.hasConfirmedName()) {
      setShowNameConfirmation(true);
      return;
    }

    if (!storage.hasCompletedOnboarding()) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleNameConfirmationComplete = useCallback(() => {
    storage.setNameConfirmed();
    setShowNameConfirmation(false);
    
    if (!storage.hasCompletedOnboarding()) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const navigateTo = useCallback((view: ArtisanView) => {
    setCurrentView(view);
  }, []);

  const navigateToDashboard = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  return {
    currentView,
    showNameConfirmation,
    showOnboarding,
    isPhoneSignup,
    navigateTo,
    navigateToDashboard,
    handleNameConfirmationComplete,
    handleOnboardingComplete,
  };
}