import { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserState } from '@/types';
import { defaultUser, mockCredentials } from '@/mocks/users';

interface AuthContextType extends UserState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<UserState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Mock della verifica delle credenziali
    if (username === mockCredentials.username && password === mockCredentials.password) {
      setAuthState({
        user: defaultUser,
        isAuthenticated: true
      });
      localStorage.setItem('user', JSON.stringify(defaultUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 