import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const STORAGE_KEY = 'kalaikatha_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadUserFromStorage(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    return loadUserFromStorage();
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _password: string, type: 'buyer' | 'artisan') => {
    // Local fallback auth: accept any credentials for dev without Firebase
    const id = email.split('@')[0] || 'local_user';
    const name = id;
    const appUser: User = { id, name, email, type, avatar: `https://ui-avatars.com/api/?name=${name}&background=random` };
    setUser(appUser);
  };

  const signup = async (email: string, _password: string, type: 'buyer' | 'artisan', name?: string) => {
    const id = email.split('@')[0] || 'local_user';
    const displayName = name || id;
    const appUser: User = { id, name: displayName, email, type, avatar: `https://ui-avatars.com/api/?name=${displayName}&background=random` };
    setUser(appUser);
  };

  const updateName = async (name: string) => {
    if (!user) throw new Error('No user logged in');
    const updated: User = { ...user, name, avatar: `https://ui-avatars.com/api/?name=${name}&background=random` };
    setUser(updated);
  };

  const logout = () => {
    setUser(null);
  };

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