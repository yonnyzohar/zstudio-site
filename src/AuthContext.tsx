import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiLogin, apiSignup } from './api';
import type { LoginResponse } from './api';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');

  useEffect(() => {
    // Sync state if localStorage changes in another tab
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'loggedIn') setIsLoggedIn(e.newValue === 'true');
      if (e.key === 'userEmail') setUserEmail(e.newValue || '');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const result = await apiLogin(email, password);
    if (result.success) {
      setIsLoggedIn(true);
      setUserEmail(email);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('storedEmail', email);
    }
    return result;
  };

  const signup = async (email: string, password: string): Promise<LoginResponse> => {
    const result = await apiSignup(email, password);
    if (result.success) {
      setIsLoggedIn(true);
      setUserEmail(email);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('storedEmail', email);
    }
    return result;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};