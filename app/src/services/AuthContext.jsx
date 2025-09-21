/**
 * Authentication Context Provider for Kalaikatha Platform
 * Features: Firebase authentication, user state management, login/logout
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore } from './firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithPhoneNumber = async (phoneNumber, password) => {
    const userRecord = await firestore.getUserByPhone(phoneNumber);
    if (!userRecord) {
      throw new Error("User not found.");
    }
    return signInWithEmailAndPassword(auth, userRecord.email, password);
  };

  const register = async (email, password, name, phoneNumber) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    await firestore.addUser(user.uid, {
      name,
      email,
      phoneNumber,
    });
    return userCredential;
  };

  const logout = async () => {
    return signOut(auth);
  };

  const value = { user, login, register, logout, loading, loginWithPhoneNumber };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};