import { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserState } from '@/types';
import { authService } from '@/services/auth';

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
    try {
        const data = await authService.login(username, password);
        setAuthState({
            user: data.user,
            isAuthenticated: true
        });
        return true;
    } catch (error) {
        return false;
    }
  };

  const logout = async () => {
    try {
        await authService.logout();
    } finally {
        setAuthState({
            user: null,
            isAuthenticated: false
        });
    }
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