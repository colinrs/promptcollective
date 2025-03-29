
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "../config/api";
import { LoginResponse, httpClient } from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await httpClient.post<LoginResponse>(API_CONFIG.USER_LOGIN, { email, password });
      
      const user = {
        id: data.userId,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        token: data.token,
        expireAt: data.expireAt,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Successfully logged in');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await httpClient.post<LoginResponse>(API_CONFIG.USER_REGISTER, { name, email, password });
      const user = {
        id: data.userId,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        token: data.token,
        expire_at: data.expireAt,
      };
      
      setUser(user);
     console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
