import { createContext, useState, useContext } from 'react';
import { User } from '@/types';

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateMood: (mood: string) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  updateMood: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = (userData: User) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const updateUser = (userData: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return userData as User;
      return { ...currentUser, ...userData };
    });
  };
  
  const updateMood = (mood: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, mood };
    });
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, updateMood }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);