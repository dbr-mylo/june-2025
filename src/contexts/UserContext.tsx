
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'contributor' | 'template-editor' | 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchToGuest: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && user.role !== 'guest';

  useEffect(() => {
    // Check for existing session or guest mode
    const checkSession = async () => {
      setIsLoading(true);
      
      // Check localStorage for guest mode
      const guestMode = localStorage.getItem('mylo_guest_mode');
      const guestRole = localStorage.getItem('mylo_guest_role') as UserRole;
      
      if (guestMode === 'true' && guestRole) {
        setUser({
          id: 'guest',
          email: 'guest@mylo.app',
          role: guestRole,
          isActive: true
        });
      }
      
      // TODO: Add Supabase session check here
      
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase authentication
      console.log('Login attempt:', email);
      
      // Mock login for now
      setUser({
        id: '1',
        email,
        role: 'contributor',
        isActive: true
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase logout
      localStorage.removeItem('mylo_guest_mode');
      localStorage.removeItem('mylo_guest_role');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchToGuest = (role: UserRole) => {
    localStorage.setItem('mylo_guest_mode', 'true');
    localStorage.setItem('mylo_guest_role', role);
    setUser({
      id: 'guest',
      email: 'guest@mylo.app',
      role,
      isActive: true
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        switchToGuest
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
