import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/FirebaseService';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../services/FirebaseService';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'artisan';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'buyer' | 'artisan') => Promise<void>;
  signup: (email: string, password: string, type: 'buyer' | 'artisan', name?: string) => Promise<void>;
  updateName: (name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize Firestore
const db = app ? getFirestore(app) : null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn('⚠️ Firebase Authentication is not configured. Please check your .env.local file.');
      setLoading(false);
      return;
    }

    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get user data from Firestore
        try {
          if (db) {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const appUser: User = {
                id: firebaseUser.uid,
                name: userData.name || firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                type: userData.type || 'buyer',
                avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${userData.name || 'User'}&background=random`,
              };
              setUser(appUser);
              localStorage.setItem('kalaikatha_user', JSON.stringify(appUser));
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('kalaikatha_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, type: 'buyer' | 'artisan') => {
    if (!auth) {
      throw new Error('Firebase Authentication is not configured. Please check your environment variables.');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged listener
      console.log('✅ Login successful:', userCredential.user.email);
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      } else {
        throw new Error(error.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  const signup = async (email: string, password: string, type: 'buyer' | 'artisan', name?: string) => {
    if (!auth || !db) {
      throw new Error('Firebase is not configured. Please check your environment variables.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Extract name from email if not provided
      const extractedName = name || (email.includes('@') ? email.split('@')[0] : 'User');

      // Update Firebase profile
      await updateProfile(firebaseUser, {
        displayName: extractedName,
      });

      // Store user data in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: extractedName,
        email: email,
        type: type,
        createdAt: new Date().toISOString(),
      });

      console.log('✅ Signup successful:', firebaseUser.email);
      
      if (name) localStorage.setItem('kalaikatha_name_confirmed', 'true');
    } catch (error: any) {
      console.error('❌ Signup failed:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists. Please sign in instead.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      } else {
        throw new Error(error.message || 'Signup failed. Please try again.');
      }
    }
  };

  const updateName = async (name: string) => {
    if (!auth || !db) {
      throw new Error('Firebase is not configured. Please check your environment variables.');
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser && user) {
        // Update Firebase profile
        await updateProfile(currentUser, { displayName: name });
        
        // Update Firestore
        await setDoc(doc(db, 'users', currentUser.uid), {
          name: name,
        }, { merge: true });

        // Update local state
        const updatedUser = {
          ...user,
          name,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        };
        setUser(updatedUser);
        localStorage.setItem('kalaikatha_user', JSON.stringify(updatedUser));
        console.log('✅ Name updated successfully');
      }
    } catch (error) {
      console.error('❌ Failed to update name:', error);
      throw new Error('Failed to update name. Please try again.');
    }
  };

  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase Authentication is not configured.');
    }

    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('kalaikatha_user');
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  if (loading) {
    return null; // Or return a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, updateName, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}