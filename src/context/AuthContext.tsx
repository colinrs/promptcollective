
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "../config/api";
import { LoginResponse, httpClient } from "../lib/api";
import { useLanguage } from "./LanguageContext";

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
  sendVerificationCode: (email: string,event: string) => Promise<void>;
  verificationCode: (code: string, email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

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
      toast.success(t('toast.auth.loginSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.auth.loginFailed'));
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
      if (data.token=="" || data.expireAt==0) {
        return;
      }
      setUser(user);
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(t('toast.auth.registerSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.auth.registerFailed'));
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success(t('toast.auth.logoutSuccess'));
  };

  const sendVerificationCode = async (email: string,event: string) => {
    setIsLoading(true);
    try {
      await httpClient.post(API_CONFIG.USER_SEND_VERIFICATION_CODE, { email,event });
      toast.success(t('toast.auth.verificationCodeSent'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.auth.verificationCodeSendFailed'));
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
      toast.success(t('toast.auth.resetPasswordSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.auth.resetPasswordFailed'));
      console.error('Reset password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verificationCode = async (code: string,email: string) => {
    setIsLoading(true);
    try {
      await httpClient.get(API_CONFIG.USER_VERIFICATION_CODE, { code,email});
      toast.success(t('toast.auth.verificationSuccess'));
    } catch (error) {
      toast.error(error instanceof Error? error.message : t('toast.auth.verificationFailed'));
      console.error('Verification code error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await httpClient.post(API_CONFIG.USER_FORGOT_PASSWORD, { email });
      toast.success(t('toast.auth.verificationCodeSent'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.auth.verificationCodeSendFailed'));
      console.error('Forgot password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
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
        sendVerificationCode,
        verificationCode,
        resetPassword,
        forgotPassword,
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
