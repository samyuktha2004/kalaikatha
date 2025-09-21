/**
 * UserFlowContext - Manages artisan workflow state and navigation
 * Handles the decision flow: Login → New Product Decision → AddProduct/Dashboard
 */

import React, { createContext, useContext, useState } from 'react';

const UserFlowContext = createContext();

export const useUserFlow = () => {
  const context = useContext(UserFlowContext);
  if (!context) {
    throw new Error('useUserFlow must be used within a UserFlowProvider');
  }
  return context;
};

export const UserFlowProvider = ({ children }) => {
  const [flowState, setFlowState] = useState({
    currentStep: 'login',
    isNewProduct: null,
    userType: null, // 'artisan' or 'customer'
    productData: {
      images: [],
      voiceDescription: null,
      transcription: '',
      generatedContent: null,
      category: '',
      materials: '',
      techniques: []
    },
    fusionPartners: []
  });

  // Decision: Is this a new product?
  const startNewProductFlow = () => {
    setFlowState(prev => ({
      ...prev,
      isNewProduct: true,
      currentStep: 'addProduct'
    }));
  };

  const goToDashboard = () => {
    setFlowState(prev => ({
      ...prev,
      isNewProduct: false,
      currentStep: 'dashboard'
    }));
  };

  // Product creation flow
  const updateProductData = (newData) => {
    setFlowState(prev => ({
      ...prev,
      productData: { ...prev.productData, ...newData }
    }));
  };

  const completeProductCreation = () => {
    setFlowState(prev => ({
      ...prev,
      currentStep: 'completed'
    }));
  };

  // Fusion craft flow
  const startFusionFlow = () => {
    setFlowState(prev => ({
      ...prev,
      currentStep: 'fusion'
    }));
  };

  const resetFlow = () => {
    setFlowState({
      currentStep: 'login',
      isNewProduct: null,
      userType: null,
      productData: {
        images: [],
        voiceDescription: null,
        transcription: '',
        generatedContent: null,
        category: '',
        materials: '',
        techniques: []
      },
      fusionPartners: []
    });
  };

  const value = {
    flowState,
    setFlowState,
    startNewProductFlow,
    goToDashboard,
    updateProductData,
    completeProductCreation,
    startFusionFlow,
    resetFlow
  };

  return (
    <UserFlowContext.Provider value={value}>
      {children}
    </UserFlowContext.Provider>
  );
};

export default UserFlowContext;