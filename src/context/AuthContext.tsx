
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
  sendVerificationCode: (email: string) => Promise<void>;
  verificationCode: (code: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
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

  const sendVerificationCode = async (email: string) => {
    setIsLoading(true);
    try {
      await httpClient.post(API_CONFIG.USER_SEND_VERIFICATION_CODE, { email });
      toast.success('验证码已发送到您的邮箱');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '发送验证码失败，请重试');
      console.error('Send verification code error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await httpClient.post(API_CONFIG.USER_RESET_PASSWORD, { email, code, newPassword });
      toast.success('密码重置成功');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '重置密码失败，请重试');
      console.error('Reset password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verificationCode = async (code: string) => {
    setIsLoading(true);
    try {
      await httpClient.post(API_CONFIG.USER_VERIFICATION_CODE, { code });
      toast.success('验证码验证成功');
    } catch (error) {
      toast.error(error instanceof Error? error.message : '验证码验证失败，请重试');
      console.error('Verification code error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        sendVerificationCode,
        verificationCode,
        resetPassword,
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
