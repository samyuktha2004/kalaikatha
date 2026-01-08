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
  signup: (email: string, password: string, type: 'buyer' | 'artisan') => Promise<void>;
  updateName: (name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('kalaikatha_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, type: 'buyer' | 'artisan') => {
    // Mock login - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract name from email (abc@gmail.com → "abc")
    const extractedName = email.includes('@') 
      ? email.split('@')[0] 
      : email.slice(0, 10); // For phone numbers, use first 10 digits
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: extractedName,
      email,
      type,
      avatar: `https://ui-avatars.com/api/?name=${extractedName}&background=random`,
    };

    setUser(mockUser);
    localStorage.setItem('kalaikatha_user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, type: 'buyer' | 'artisan') => {
    // Mock signup - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract name from email/phone
    const extractedName = email.includes('@') 
      ? email.split('@')[0] 
      : ''; // Phone numbers: name will be set during onboarding
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: extractedName,
      email,
      type,
      avatar: extractedName 
        ? `https://ui-avatars.com/api/?name=${extractedName}&background=random`
        : `https://ui-avatars.com/api/?name=User&background=random`,
    };

    setUser(mockUser);
    localStorage.setItem('kalaikatha_user', JSON.stringify(mockUser));
  };

  const updateName = async (name: string) => {
    // Update user name - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (user) {
      const updatedUser = {
        ...user,
        name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
      };
      
      setUser(updatedUser);
      localStorage.setItem('kalaikatha_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kalaikatha_user');
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