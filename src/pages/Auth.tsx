
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Parse mode from URL query params
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get("mode");
    
    if (modeParam === "register" || modeParam === "login") {
      setMode(modeParam);
    }
  }, [location]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };
    
    // Validate email
    if (!formData.email) {
      newErrors.email = t('auth.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.emailInvalid');
      valid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = t('auth.passwordRequired');
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.passwordLength');
      valid = false;
    }
    
    // Validate name for register mode
    if (mode === "register" && !formData.name) {
      newErrors.name = t('auth.nameRequired');
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (mode === "login") {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password);
      // 注册成功后跳转到邮箱验证页面，并传递邮箱信息
      navigate('/email-verification', { state: { email: formData.email } });
      return; // 防止执行后续的重定向逻辑
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setMode(prev => (prev === "login" ? "register" : "login"));
    // Update URL
    navigate(`/auth?mode=${mode === "login" ? "register" : "login"}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <Card className="border-border/50 shadow-lg animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {mode === "login" ? t('auth.login.title') : t('auth.register.title')}
              </CardTitle>
              <CardDescription>
                {mode === "login"
                  ? t('auth.login.description')
                  : t('auth.register.description')}
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {mode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('auth.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    {mode === "login" && (
                      <Link
                        to="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        {t('auth.forgotPassword')}
                      </Link>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {mode === "login" ? t('auth.submit.login') + '...' : t('auth.submit.register') + '...'}
                    </>
                  ) : mode === "login" ? (
                    t('auth.submit.login')
                  ) : (
                    t('auth.submit.register')
                  )}
                </Button>
                
                <p className="text-sm text-center text-gray-500">
                  {mode === "login"
                    ? t('auth.switchMode.register')
                    : t('auth.switchMode.login')}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium"
                  >
                    {mode === "login" ? t('auth.submit.register') : t('auth.submit.login')}
                  </button>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
