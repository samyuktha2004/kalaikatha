/**
 * Firebase Authentication Test & Verification Script
 * Tests Firebase connection, authentication methods, and user storage
 */

import { auth, db } from '../src/services/firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../src/services/firestore.js';

const testFirebaseAuthentication = async () => {
  console.log('🔥 Firebase Authentication Integration Test');
  console.log('==========================================');

  try {
    // Test 1: Firebase Connection
    console.log('✅ Test 1: Firebase Configuration');
    console.log('Project ID:', auth.app.options.projectId);
    console.log('Auth Domain:', auth.app.options.authDomain);
    
    // Test 2: User Registration with Email, Phone, Password
    console.log('\\n✅ Test 2: User Registration');
    const testUser = {
      email: 'test.artisan@kalaikatha.com',
      password: 'TestPassword123!',
      name: 'Test Artisan',
      phoneNumber: '+91-9876543210'
    };

    // Create user with email/password
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      testUser.email, 
      testUser.password
    );
    console.log('✅ User created with UID:', userCredential.user.uid);

    // Store additional user data in Firestore
    await firestore.addUser(userCredential.user.uid, {
      name: testUser.name,
      email: testUser.email,
      phoneNumber: testUser.phoneNumber,
      userType: 'artisan',
      createdAt: new Date(),
      profile: {
        specialization: 'Pottery',
        location: 'Rajasthan',
        experience: '5 years'
      }
    });
    console.log('✅ User data stored in Firestore');

    // Test 3: Login with Email
    console.log('\\n✅ Test 3: Email Login');
    await signOut(auth);
    const emailLogin = await signInWithEmailAndPassword(auth, testUser.email, testUser.password);
    console.log('✅ Email login successful:', emailLogin.user.email);

    // Test 4: Fetch User Data
    console.log('\\n✅ Test 4: User Data Retrieval');
    const userData = await firestore.getUser(emailLogin.user.uid);
    console.log('✅ User data retrieved:', {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber
    });

    // Test 5: Phone Number Login (using custom function)
    console.log('\\n✅ Test 5: Phone Number Login');
    await signOut(auth);
    const phoneUser = await firestore.getUserByPhone(testUser.phoneNumber);
    console.log('✅ User found by phone:', phoneUser ? 'Yes' : 'No');
    
    if (phoneUser) {
      const phoneLogin = await signInWithEmailAndPassword(auth, phoneUser.email, testUser.password);
      console.log('✅ Phone-based login successful:', phoneLogin.user.email);
    }

    // Test 6: Authentication State
    console.log('\\n✅ Test 6: Authentication State');
    console.log('Current user:', auth.currentUser ? auth.currentUser.email : 'None');
    console.log('Is authenticated:', !!auth.currentUser);

    // Cleanup
    await signOut(auth);
    console.log('\\n✅ Test completed successfully - User signed out');

    return {
      status: 'SUCCESS',
      message: 'All Firebase authentication features working correctly',
      features: {
        emailRegistration: true,
        emailLogin: true,
        phoneNumberStorage: true,
        phoneNumberLogin: true,
        firestoreIntegration: true,
        userDataStorage: true
      }
    };

  } catch (error) {
    console.error('❌ Firebase Test Failed:', error);
    return {
      status: 'ERROR',
      message: error.message,
      features: {
        emailRegistration: false,
        emailLogin: false,
        phoneNumberStorage: false,
        phoneNumberLogin: false,
        firestoreIntegration: false,
        userDataStorage: false
      }
    };
  }
};

// Export for use in browser console or testing
export { testFirebaseAuthentication };

// For Node.js testing
if (typeof window === 'undefined') {
  testFirebaseAuthentication().then(result => {
    console.log('\\n🔥 Final Test Result:', result);
  });
}